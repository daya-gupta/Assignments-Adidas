function operate(op1, op2, operator) {
    if (operator === '/') {
        return op1 / op2;
    } else if (operator === '*') {
        return op1 * op2;
    } else if (operator === '+') {
        return Number(op1) + Number(op2);
    } else if (operator === '-') {
        return op1 - op2;
    }    
}

function getOperandValue(operand) {
    const num = operand.match(/[\d\.]+/)[0];
    const operators = [...operand.matchAll(/[+-]/g)];
    if (!operators) {
        return operand;
    }
    return operators.reduce((a, b) => b[0] === '+' ? a : -a, num);
}

function getRegex(operator) {
//     [
//         to get 1st operand
//         to get 2nd operand
//         to check whether given operator exist in exp or not,
//         to get 1st operand when it is accompained by a uniary operator
//         to decide whether operand is accompained by a uniary operator
//     ]
    if (operator === '/') {
        return [/[+-\s]*[\d\.]+\s*\//, /[\d.\s]+\/[\s+-]*[\d\.]+/, /\//, /[\d\.]+\s*\//, /[\d\.]+[+-\s]*[\d\.]+\s*\//];
    } else if (operator === '*') {
        return [/[+-\s]*[\d\.]+\s*\*/, /[\d.\s]+\*[\s+-]*[\d\.]+/, /\*/, /[\d\.]+\s*\*/, /[\d\.]+[+-\s]*[\d\.]+\s*\*/];
    } else if (operator === '+') {
        return [/[+-\s]*[\d\.]+\s*\+/, /[\d.\s]+\+[\s+-]*[\d\.]+/, /\+/, /[\d\.]+\s*\+/, /[\d\.]+[+-\s]*[\d\.]+\s*\+/];
    } else if (operator === '-') {
        return [/[+-\s]*[\d\.]+\s*\-/, /[\d.\s]+\-[\s+-]*[\d\.]+/, /\-/, /[\d\.]+\s*\-/, /[\d\.]+[+-\s]*[\d\.]+\s*\-/];
    }
}

function compute(exp, op) {
    const [reg1, reg2, reg3, reg4, reg5] = getRegex(op);
    let match = exp.match(reg3);
    if (match) {
        //         find operand1 & operand2
        let initialOp1 = (reg5).test(exp) ? exp.match(reg4) : exp.match(reg1);
        if (!initialOp1) {
            return exp;
        }
        initialOp1 = initialOp1[0];
        initialOp1 = initialOp1.substring(0, initialOp1.length - 1);
        const op1 = getOperandValue(initialOp1);

        let initialOp2 = exp.match(reg2);
        if (!initialOp2) {
            return exp;
        }
        initialOp2 = initialOp2[0].replace(/[\d.\s]+/, '');
        initialOp2 = initialOp2.substring(1, initialOp2.length);
        const op2 = getOperandValue(initialOp2);
        
        const val = operate(op1, op2, op);
        //         replace expression by value;
        exp = exp.replace(`${initialOp1}${op}${initialOp2}`, val);
    }
    match = exp.match(reg3);
    if (match) {
        return compute(exp, op);    
    } else {
        return exp;
    }
}


function calcString(exp) {
    const ops = ['/', '*', '+', '-'];
    ops.forEach(op => {
        exp = compute(exp, op)
    });
    return Number(exp);
}


// test cases
expect(calcString('1 + 1'), 2);
expect(calcString('1 - 1'), 0);
expect(calcString('2+ 2'), 4);
expect(calcString('2+ 5-3'), 4);
expect(calcString('2+ 5-3 -6'), -2);
expect(calcString('1'), 1);
expect(calcString('+1'), 0);
expect(calcString('2 * 2'), 4);
expect(calcString('2 * 2.4'), 4.8);
expect(calcString('21 + 1'), 22);
expect(calcString('0 - 1'), -1);
expect(calcString('1 + 1 * 2'), 3);
expect(calcString('1 + 1 / 2'), 1.5);
expect(calcString('1 + + 1'), 2);
expect(calcString('1 + - 1'), 0);
expect(calcString('+ 1 * 1 + 1 / 2'), 1.5);
function expect(result, expected) {
  const correct = !isNaN(result) && result === expected;
  if (correct) {
    console.info('Correct!');
  } else {
    console.error(`Error: ${ result } does not match ${
      expected }`);
  }
}
