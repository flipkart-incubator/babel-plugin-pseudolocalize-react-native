const defaultConfigLength = require("./PhoneticConstants").defaultConfigLength;
const PseudoLangMap = require("./PhoneticConstants").PseudoLangMap;
const template = require("@babel/template").default;

const convertToPhonetics = require('./PhoneticConverter');
module.exports = function (api, options) {
    const {types: t} = api;
    const extraLength = options.extraLength || defaultConfigLength;
    const languageMap = options.customLanguageMap || PseudoLangMap;
    const languageMapString = JSON.stringify(languageMap);
    let root;
    return {
        visitor: {
            Program(path) {
                root = path;
                const code = `if(!global.convertToPhonetics){global.convertToPhonetics = ${convertToPhonetics};}`;
                path.node.body.unshift(template.ast(code));
            },
            JSXOpeningElement(path) {
                const node = path.node;
                if (t.isJSXOpeningElement(node)) {
                    // @TODO: Add NodeList as plugin input
                    if (node && node.name && node.name.name && (node.name.name === 'Text')) {
                        const parentPath = path.findParent((path) => path.isJSXElement());
                        let children = parentPath && parentPath.node && parentPath.node.children;
                        let newChildren =
                            children &&
                            children.map((child) => {
                                if (child.type === 'JSXExpressionContainer') {
                                    switch (child.expression.type) {
                                        case 'MemberExpression':
                                        case 'ConditionalExpression':
                                        case 'OptionalMemberExpression':
                                        case 'ChainExpression':
                                        case 'StringLiteral':
                                        case 'Identifier':
                                            const injectFunction = t.CallExpression(t.identifier('convertToPhonetics'), [child.expression, t.NumericLiteral(extraLength), t.StringLiteral(languageMapString)]);
                                            child = t.JSXExpressionContainer(injectFunction);
                                            break;
                                        case 'CallExpression':
                                            if (child.expression.callee.name !== 'convertToPhonetics') {
                                                const injectFunction = t.CallExpression(t.identifier('convertToPhonetics'), [child.expression, t.NumericLiteral(extraLength), t.StringLiteral(languageMapString)]);
                                                child = t.JSXExpressionContainer(injectFunction);
                                            }
                                            break;
                                    }
                                    return child;
                                }
                                if (child.type === 'JSXText') {
                                    if (child.value.trim().length > 0) {
                                        return t.JSXText(convertToPhonetics(child.value, extraLength, languageMapString));
                                    }
                                    return child;
                                }
                                return child;
                            });
                        parentPath.node.children = newChildren;
                    }
                }
            }
        }
    };
};
