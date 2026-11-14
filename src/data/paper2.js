// Paper 2 (J277/02) Computational thinking, algorithms and programming — exam-style questions.
// Section A: general questions. Section B (section: 'B'): writing / refining code in OCR Exam
// Reference Language (ERL) or a high-level language such as Python.
// See paper1.js for the part type reference.

export const PAPER2 = [
  {
    id: 'p2-ct', paper: 2, topic: '2.1',
    ctx: 'A developer is creating a journey planner app for a city\'s underground train network.',
    parts: [
      { t: 'written', m: 2, p: 'Explain how abstraction could be used when creating the map for the app.', ms: ['Removing unnecessary detail e.g. exact distances / streets / buildings / scenery', 'Focusing only on what matters: stations, lines and connections'] },
      { t: 'written', m: 2, p: 'Explain how decomposition could be used to help create the app.', ms: ['Breaking the problem into smaller sub-problems', 'e.g. inputting start/end stations, calculating the route, calculating the fare, displaying the route (each can be solved / tested separately)'] },
      { t: 'written', m: 2, p: 'Identify one input and one output for the journey planner.', ms: ['Input: start station / destination / time of travel', 'Output: the route / journey time / fare / changes needed'] },
    ],
  },
  {
    id: 'p2-search', paper: 2, topic: '2.1',
    ctx: 'A program stores the following list of numbers:\n\n[3, 9, 14, 21, 27, 35, 42, 50, 61]',
    parts: [
      { t: 'written', m: 1, p: 'State why a binary search can be used on this list.', ms: ['The list is sorted / in order'] },
      { t: 'written', m: 3, p: 'Show the stages of a binary search to find the number 42.', ms: ['Compare 42 with the middle item 27', '42 is greater so discard 27 and everything to its left / search right half [35, 42, 50, 61]', 'Compare 42 with the new middle item (42, or 50 then 35/42)', 'Item found'] },
      { t: 'written', m: 2, p: 'Describe how a linear search would find the number 42 in this list.', ms: ['Starts at the first item (3) and compares it with 42', 'Moves to the next item in turn until 42 is found (7th item) / end of list reached'] },
      { t: 'written', m: 1, p: 'Give one advantage of a linear search compared to a binary search.', ms: ['Works on unsorted data / simpler to program / efficient for small lists'] },
    ],
  },
  {
    id: 'p2-sort', paper: 2, topic: '2.1',
    ctx: 'A program needs to sort this list into ascending order:\n\n[6, 2, 9, 4, 1]',
    parts: [
      { t: 'short', m: 2, p: 'Give the list after the first pass of a bubble sort.', a: ['2,6,4,1,9', '[2,6,4,1,9]', '2 6 4 1 9', '26419'], ms: ['6/2 swap, 6/9 no swap, 9/4 swap, 9/1 swap', '[2, 6, 4, 1, 9]'] },
      { t: 'written', m: 3, p: 'Describe how a merge sort would sort the list.', ms: ['The list is repeatedly split in half…', '…until each sub-list contains one item', 'Pairs of sub-lists are merged by comparing their first items and placing them in order', 'Repeated until there is one sorted list'] },
      { t: 'written', m: 1, p: 'State one advantage of an insertion sort compared with a merge sort.', ms: ['Uses less memory / no extra lists needed / simpler to code / efficient on small or nearly sorted lists'] },
    ],
  },
  {
    id: 'p2-trace-for', paper: 2, topic: '2.1',
    ctx: 'Look at the following algorithm.',
    code: `total = 0
for i = 1 to 4
    total = total + i * 2
next i
print(total)`,
    parts: [
      {
        t: 'table', m: 4, p: 'Complete the trace table for the algorithm.',
        cols: ['i', 'total'],
        rows: [
          ['', '0'],
          [{ a: ['1'] }, { a: ['2'] }],
          [{ a: ['2'] }, { a: ['6'] }],
          [{ a: ['3'] }, { a: ['12'] }],
          [{ a: ['4'] }, { a: ['20'] }],
        ],
      },
      { t: 'short', m: 1, p: 'State the output of the algorithm.', a: ['20'], ms: ['20'] },
    ],
  },
  {
    id: 'p2-trace-while', paper: 2, topic: '2.1',
    ctx: 'Look at the following algorithm.',
    code: `num = int(input("Enter a number"))
result = 1
while num > 0
    result = result * num
    num = num - 1
endwhile
print(result)`,
    parts: [
      {
        t: 'table', m: 4, p: 'Complete the trace table when the user enters 4.',
        cols: ['num', 'result'],
        rows: [
          ['4', '1'],
          [{ a: ['3'] }, { a: ['4'] }],
          [{ a: ['2'] }, { a: ['12'] }],
          [{ a: ['1'] }, { a: ['24'] }],
          [{ a: ['0'] }, { a: ['24'] }],
        ],
      },
      { t: 'mcq', m: 1, p: 'State the purpose of the algorithm. Tick one box.', opts: ['Calculates the factorial of the number entered', 'Adds up the numbers from 1 to the number entered', 'Counts down from the number entered', 'Calculates the square of the number entered'], ans: 0, ms: ['Factorial (4! = 24)'] },
      { t: 'mcq', m: 1, p: 'Identify the type of iteration used in the algorithm.', opts: ['Condition-controlled', 'Count-controlled', 'Selection', 'Recursion'], ans: 0, ms: ['Condition-controlled (while loop)'] },
    ],
  },
  {
    id: 'p2-flowchart', paper: 2, topic: '2.1',
    ctx: 'A flowchart is used to design an algorithm that checks whether a user is old enough to vote (18 or over).',
    parts: [
      {
        t: 'table', m: 4, p: 'Choose the flowchart symbol that should be used for each step.',
        cols: ['Step', 'Symbol'],
        rows: [
          ['Start', { a: 'Rounded rectangle (terminator)', opts: ['Rounded rectangle (terminator)', 'Parallelogram', 'Rectangle', 'Diamond'] }],
          ['Input age', { a: 'Parallelogram', opts: ['Rounded rectangle (terminator)', 'Parallelogram', 'Rectangle', 'Diamond'] }],
          ['Is age >= 18?', { a: 'Diamond', opts: ['Rounded rectangle (terminator)', 'Parallelogram', 'Rectangle', 'Diamond'] }],
          ['yearsLeft = 18 - age', { a: 'Rectangle', opts: ['Rounded rectangle (terminator)', 'Parallelogram', 'Rectangle', 'Diamond'] }],
        ],
      },
      { t: 'written', m: 2, p: 'Give two other ways an algorithm can be represented apart from a flowchart.', ms: ['Pseudocode', 'OCR Exam Reference Language / program code', 'Structure diagram'] },
    ],
  },
  {
    id: 'p2-datatypes', paper: 2, topic: '2.2',
    ctx: 'A gym stores data about its members.',
    parts: [
      {
        t: 'table', m: 4, p: 'Choose the most appropriate data type for each item of data.',
        cols: ['Data', 'Data type'],
        rows: [
          ['Number of classes attended', { a: 'Integer', opts: ['Integer', 'Real', 'Boolean', 'String'] }],
          ['Monthly fee e.g. 24.99', { a: 'Real', opts: ['Integer', 'Real', 'Boolean', 'String'] }],
          ['Whether the member has paid', { a: 'Boolean', opts: ['Integer', 'Real', 'Boolean', 'String'] }],
          ['Postcode', { a: 'String', opts: ['Integer', 'Real', 'Boolean', 'String'] }],
        ],
      },
      { t: 'written', m: 2, p: 'Define the term casting and give an example of when it would be used.', ms: ['Changing / converting the data type of a value / variable', 'e.g. converting a string input to an integer so it can be used in a calculation – int(input())'] },
      { t: 'short', m: 1, p: 'State the result of 23 MOD 4.', a: ['3'], ms: ['3'] },
      { t: 'short', m: 1, p: 'State the result of 23 DIV 4.', a: ['5'], ms: ['5'] },
      { t: 'short', m: 1, p: 'State the result of 2 ^ 5.', a: ['32'], ms: ['32'] },
    ],
  },
  {
    id: 'p2-vat', paper: 2, topic: '2.2',
    ctx: 'A shop uses the following program to calculate the price of an item.',
    code: `01 const VAT = 0.2
02 price = float(input("Enter price"))
03 if price > 100 then
04     discount = price * 0.1
05 else
06     discount = 0
07 endif
08 total = (price - discount) * (1 + VAT)
09 print(total)`,
    parts: [
      { t: 'short', m: 1, p: 'Identify the constant used in the program.', a: ['vat'], ms: ['VAT'] },
      { t: 'short', m: 1, p: 'Identify one variable used in the program.', a: ['price', 'discount', 'total'], ms: ['price / discount / total'] },
      { t: 'written', m: 2, p: 'Explain why VAT has been declared as a constant rather than a variable.', ms: ['The value does not change while the program is running / cannot be accidentally changed', 'If the VAT rate changes it only needs updating in one place'] },
      { t: 'short', m: 1, p: 'Identify the programming construct used on lines 03 to 07.', a: ['selection', 'if', 'if statement', 'selection (if)'], ms: ['Selection'] },
      { t: 'short', m: 1, p: 'State the output when the user enters 200.', a: ['216', '216.0', '216.00'], ms: ['discount = 20, (200 − 20) × 1.2 = 216'] },
      { t: 'written', m: 2, p: 'Explain why float() is used on line 02.', ms: ['input() returns a string', 'The value needs to be a number (real) to be compared / used in calculations'] },
    ],
  },
  {
    id: 'p2-arrays', paper: 2, topic: '2.2',
    ctx: 'A program stores student names in an array.',
    code: `names = ["Asha", "Ben", "Chloe", "Dev", "Ella"]`,
    parts: [
      { t: 'short', m: 1, p: 'State the value of names[2].', a: ['chloe', '"chloe"'], ms: ['"Chloe" (arrays are zero-indexed)'] },
      { t: 'written', code: true, m: 3, p: 'Write an algorithm that uses a FOR loop to output every name in the array.', ms: ['for loop with correct start (0)', '…and correct end (4 / names.length - 1)', 'Outputs names[i] inside the loop'] },
      { t: 'short', m: 1, p: 'State the value of names[2].length.', a: ['5'], ms: ['5'] },
      { t: 'short', m: 1, p: 'State the value of names[3].upper.', a: ['dev', '"dev"'], ms: ['"DEV"'] },
      { t: 'short', m: 1, p: 'State the value of names[0].substring(0, 2).', a: ['as', '"as"'], ms: ['"As"'] },
    ],
  },
  {
    id: 'p2-sql', paper: 2, topic: '2.2',
    ctx: 'A club stores data about its members in a database table called Members.',
    data: {
      cols: ['MemberID', 'FirstName', 'Surname', 'Age', 'Town'],
      rows: [
        ['1', 'Amir', 'Khan', '34', 'Leeds'],
        ['2', 'Bella', 'Jones', '28', 'York'],
        ['3', 'Cara', 'Smith', '41', 'Leeds'],
        ['4', 'Dan', 'Brown', '19', 'Hull'],
      ],
    },
    parts: [
      { t: 'written', code: true, m: 3, p: 'Write an SQL statement to display the first name and surname of all members who live in Leeds.', ms: ['SELECT FirstName, Surname', 'FROM Members', 'WHERE Town = "Leeds"'] },
      { t: 'short', m: 1, p: 'State how many records would be returned by:\nSELECT * FROM Members WHERE Age > 25 AND Town = "Leeds"', a: ['2', 'two'], ms: ['2 (Amir and Cara)'] },
      { t: 'written', m: 1, p: 'Explain what the * means in an SQL SELECT statement.', ms: ['Select all fields / columns'] },
    ],
  },
  {
    id: 'p2-subprograms', paper: 2, topic: '2.2',
    ctx: 'A programmer is writing a large program using subprograms.',
    parts: [
      { t: 'written', m: 4, p: 'Explain two benefits of using subprograms.', ms: ['Code can be reused…', '…so it does not have to be written out again / shorter program', 'Each subprogram can be tested separately…', '…making errors easier to find and fix', 'Different programmers can work on different subprograms / easier to maintain / decomposition'] },
      { t: 'written', m: 2, p: 'Describe the difference between a function and a procedure.', ms: ['A function returns a value', 'A procedure does not return a value'] },
      { t: 'written', m: 2, p: 'Describe the difference between a local variable and a global variable.', ms: ['A local variable can only be accessed within the subprogram it is declared in', 'A global variable can be accessed anywhere in the program'] },
    ],
  },
  {
    id: 'p2-files', paper: 2, topic: '2.2',
    ctx: 'A game stores the high score in a text file called highscore.txt.',
    parts: [
      { t: 'written', code: true, m: 3, p: 'Write an algorithm to open the file highscore.txt, read the first line, output it, and close the file.', ms: ['Opens the file e.g. myFile = open("highscore.txt")', 'Reads a line e.g. score = myFile.readLine() and outputs it', 'Closes the file e.g. myFile.close()'] },
      { t: 'written', code: true, m: 2, p: 'Write a line of code that generates a random whole number between 1 and 100 (inclusive) and stores it in a variable called target.', ms: ['target = …', '…random(1, 100) (or random.randint(1, 100))'] },
    ],
  },
  {
    id: 'p2-validation', paper: 2, topic: '2.3',
    ctx: 'A cinema booking program asks users to enter their age. Valid ages are whole numbers from 3 to 120 inclusive.',
    parts: [
      { t: 'written', m: 4, p: 'Identify two validation checks that could be used on the age and describe how each would work.', ms: ['Range check…', '…checks age is between 3 and 120 (>= 3 and <= 120)', 'Type check…', '…checks the input is an integer / number', 'Presence check… checks that something has been entered'] },
      {
        t: 'table', m: 4, p: 'Complete the test plan by identifying the type of each test data.',
        cols: ['Test data', 'Type of test data'],
        rows: [
          ['50', { a: 'Normal', opts: ['Normal', 'Boundary', 'Invalid', 'Erroneous'] }],
          ['120', { a: 'Boundary', opts: ['Normal', 'Boundary', 'Invalid', 'Erroneous'] }],
          ['"ten"', { a: 'Erroneous', opts: ['Normal', 'Boundary', 'Invalid', 'Erroneous'] }],
          ['150', { a: 'Invalid', opts: ['Normal', 'Boundary', 'Invalid', 'Erroneous'] }],
        ],
      },
      { t: 'written', m: 2, p: 'Explain what is meant by authentication and give one method of authentication.', ms: ['Checking / confirming the identity of a user', 'e.g. username and password / biometrics / two-factor authentication'] },
    ],
  },
  {
    id: 'p2-errors', paper: 2, topic: '2.3',
    ctx: 'The following program should ask the user for 5 numbers and output their average. It contains errors.',
    code: `01 total = 0
02 for count = 1 to 5
03     num = int(input("Enter number"))
04     total = total + num
05 next count
06 average = total / 4
07 print("Average is " + str(average)`,
    parts: [
      { t: 'short', m: 1, p: 'State the line number that contains a syntax error.', a: ['7', '07', 'line 7', 'line 07'], ms: ['Line 07 (missing closing bracket)'] },
      { t: 'written', code: true, m: 1, p: 'Write the corrected version of that line.', ms: ['print("Average is " + str(average))'] },
      { t: 'short', m: 1, p: 'State the line number that contains a logic error.', a: ['6', '06', 'line 6', 'line 06'], ms: ['Line 06'] },
      { t: 'written', code: true, m: 1, p: 'Write the corrected version of that line.', ms: ['average = total / 5'] },
      { t: 'written', m: 4, p: 'Describe two ways the maintainability of this program could be improved.', ms: ['Add comments…', '…to explain what each section of code does', 'Use a constant for the number of values (e.g. const COUNT = 5)…', '…so it only needs changing in one place', 'Meaningful identifiers / indentation / subprograms (with explanation)'] },
      { t: 'written', m: 2, p: 'Describe the difference between iterative testing and final testing.', ms: ['Iterative testing takes place during development / each module is tested as it is written', 'Final testing takes place at the end of development / the whole program is tested'] },
    ],
  },
  {
    id: 'p2-logic-tables', paper: 2, topic: '2.4',
    ctx: 'Logic circuits can be described using truth tables.',
    parts: [
      {
        t: 'table', m: 2, p: 'Complete the truth table for P = NOT (A AND B).',
        cols: ['A', 'B', 'P'],
        rows: [
          ['0', '0', { a: ['1'] }],
          ['0', '1', { a: ['1'] }],
          ['1', '0', { a: ['1'] }],
          ['1', '1', { a: ['0'] }],
        ],
      },
      {
        t: 'table', m: 4, p: 'Complete the truth table for P = (A OR B) AND NOT C.',
        cols: ['A', 'B', 'C', 'P'],
        rows: [
          ['0', '0', '0', { a: ['0'] }],
          ['0', '0', '1', { a: ['0'] }],
          ['0', '1', '0', { a: ['1'] }],
          ['0', '1', '1', { a: ['0'] }],
          ['1', '0', '0', { a: ['1'] }],
          ['1', '0', '1', { a: ['0'] }],
          ['1', '1', '0', { a: ['1'] }],
          ['1', '1', '1', { a: ['0'] }],
        ],
      },
      { t: 'written', code: true, m: 3, p: 'An alarm (P) sounds if the sensor (S) is activated AND the system is switched on (O), OR if the panic button (B) is pressed. Write the logic expression for P.', ms: ['S AND O', '… OR B', 'Correct brackets / complete expression: P = (S AND O) OR B'] },
    ],
  },
  {
    id: 'p2-logic-eval', paper: 2, topic: '2.4',
    ctx: 'A = 1, B = 0 and C = 1.',
    parts: [
      { t: 'short', m: 1, p: 'State the output of A AND B.', a: ['0'], ms: ['0'] },
      { t: 'short', m: 1, p: 'State the output of (A OR B) AND C.', a: ['1'], ms: ['1'] },
      { t: 'short', m: 1, p: 'State the output of NOT A OR (B AND C).', a: ['0'], ms: ['NOT 1 = 0; B AND C = 0; 0 OR 0 = 0'] },
      { t: 'mcq', m: 1, p: 'Identify the logic gate that outputs 1 only when both of its inputs are 1.', opts: ['AND', 'OR', 'NOT', 'None of these'], ans: 0, ms: ['AND'] },
    ],
  },
  {
    id: 'p2-languages', paper: 2, topic: '2.5',
    ctx: 'Programs can be written in high-level or low-level languages.',
    parts: [
      { t: 'written', m: 2, p: 'Give two characteristics of a high-level language.', ms: ['Uses English-like keywords / easier for humans to read and write', 'Portable / not specific to one type of processor', 'One statement translates to many machine code instructions', 'Must be translated before it can be run'] },
      { t: 'written', m: 2, p: 'Give two reasons why a programmer might choose to use a low-level language.', ms: ['Direct control of hardware / memory', 'Code can be more efficient / run faster / use less memory', 'Suitable for embedded systems / device drivers'] },
      { t: 'written', m: 4, p: 'Compare a compiler and an interpreter.', ms: ['Compiler translates the whole program in one go, interpreter translates line by line', 'Compiler produces an executable file, interpreter does not', 'Compiled program runs faster / does not need translator to run; interpreted code needs the interpreter every time', 'Compiler reports all errors at the end, interpreter stops at the first error found (easier debugging)', 'Compiled code hides the source code'] },
    ],
  },
  {
    id: 'p2-ide', paper: 2, topic: '2.5',
    ctx: 'A programmer is using an Integrated Development Environment (IDE).',
    parts: [
      { t: 'written', m: 4, p: 'Describe two tools in an IDE that help a programmer to find and fix errors.', ms: ['Error diagnostics…', '…highlights errors / shows line numbers and type of error', 'Breakpoints / stepping…', '…pause the program at a chosen line / run line by line to see where it goes wrong', 'Variable watch / trace – shows the values of variables as the program runs'] },
      { t: 'written', m: 2, p: 'Describe one feature of the editor in an IDE.', ms: ['Feature named e.g. syntax highlighting / auto-indent / auto-complete / line numbers', 'Description e.g. colours keywords so mistakes are easier to spot'] },
    ],
  },

  // ───────────── Section B ─────────────
  {
    id: 'p2b-cinema', paper: 2, topic: '2.2', section: 'B',
    ctx: 'A cinema charges £8 for each adult ticket and £5 for each child ticket. If the total cost is more than £50, a 10% discount is applied.',
    parts: [
      { t: 'written', code: true, m: 6, p: 'Write an algorithm that:\n• asks the user to enter the number of adult tickets and the number of child tickets\n• calculates the total cost\n• applies the discount if appropriate\n• outputs the total cost.', ms: ['Inputs number of adult tickets', 'Inputs number of child tickets (both cast to integer)', 'Calculates total = adults * 8 + children * 5', 'Uses selection to check if total > 50', 'Applies discount e.g. total = total * 0.9', 'Outputs the total'] },
    ],
  },
  {
    id: 'p2b-password', paper: 2, topic: '2.3', section: 'B',
    ctx: 'A website requires users to choose a password that is at least 8 characters long.',
    parts: [
      { t: 'written', code: true, m: 4, p: 'Write a function called checkPassword that takes a password as a parameter and returns True if it is at least 8 characters long, or False otherwise.', ms: ['Function definition with parameter e.g. function checkPassword(password)', 'Uses .length / len() on the password', 'Correct comparison (>= 8)', 'Returns True / False appropriately'] },
      { t: 'written', code: true, m: 4, p: 'Write an algorithm that repeatedly asks the user to enter a password until checkPassword returns True, then outputs "Password accepted".', ms: ['Inputs a password', 'Uses a condition-controlled loop (while / do…until)', 'Calls checkPassword with the password as the argument and uses the result', 'Re-inputs inside the loop and outputs "Password accepted" after the loop'] },
    ],
  },
  {
    id: 'p2b-temps', paper: 2, topic: '2.2', section: 'B',
    ctx: 'A weather station stores a week of daily temperatures in an array.',
    code: `temps = [12, 15, 9, 20, 18, 11, 14]`,
    parts: [
      { t: 'written', code: true, m: 6, p: 'Write an algorithm that finds and outputs the highest temperature and the average (mean) temperature for the week.', ms: ['Initialises highest (e.g. to temps[0]) and total = 0', 'Loops through every item in the array', 'Compares each item with highest…', '…and updates highest if larger', 'Adds each item to total', 'Calculates average = total / 7 (or / temps.length) and outputs highest and average'] },
    ],
  },
  {
    id: 'p2b-quiz', paper: 2, topic: '2.2', section: 'B',
    ctx: 'A times-tables quiz asks the user 10 questions.',
    parts: [
      { t: 'written', code: true, m: 6, p: 'Write an algorithm that:\n• repeats 10 times\n• generates two random whole numbers between 1 and 12\n• asks the user for the product of the two numbers\n• adds 1 to a score if the answer is correct\n• outputs the final score at the end.', ms: ['Score initialised to 0', 'Count-controlled loop that runs 10 times', 'Generates two random numbers 1–12 inside the loop', 'Asks the question and inputs the answer (cast to integer)', 'Checks answer == num1 * num2 and increments score', 'Outputs score after the loop'] },
    ],
  },
  {
    id: 'p2b-grades', paper: 2, topic: '2.3', section: 'B',
    ctx: 'A teacher needs a program to convert test scores into grades. Scores must be whole numbers from 0 to 100.',
    parts: [
      { t: 'written', code: true, m: 6, p: 'Write an algorithm that:\n• asks the user to enter a score\n• repeats the input until a valid score (0–100) is entered\n• outputs "Distinction" for 70 or more, "Merit" for 50–69, "Pass" for 40–49 and "Fail" otherwise.', ms: ['Inputs the score (as integer)', 'Loop that repeats while score < 0 OR score > 100', 'Re-inputs score inside the loop', 'Correct check for >= 70 → Distinction', 'Correct check for >= 50 → Merit and >= 40 → Pass', 'Else → Fail (correct use of if / elseif / else)'] },
    ],
  },
  {
    id: 'p2b-file-count', paper: 2, topic: '2.2', section: 'B',
    ctx: 'A text file called names.txt contains one name on each line.',
    parts: [
      { t: 'written', code: true, m: 5, p: 'Write an algorithm that reads every name in names.txt and outputs how many names begin with the letter "A".', ms: ['Opens names.txt', 'Loops until end of file (while NOT myFile.endOfFile())', 'Reads each line', 'Checks the first character e.g. name.substring(0,1) == "A" and increments a count', 'Closes the file and outputs the count'] },
    ],
  },
  {
    id: 'p2b-linear', paper: 2, topic: '2.1', section: 'B',
    ctx: 'A linear search is needed to find an item in an array.',
    parts: [
      { t: 'written', code: true, m: 5, p: 'Write a function linearSearch(items, target) that returns the index of target in the array items, or -1 if it is not found.', ms: ['Function definition with two parameters', 'Loop through each index of items', 'Compare items[i] with target', 'Return i when found', 'Return -1 after the loop if not found'] },
    ],
  },
  {
    id: 'p2b-complete', paper: 2, topic: '2.2', section: 'B',
    ctx: 'The following algorithm should count how many numbers in the array are even. Some parts are missing.',
    code: `nums = [4, 7, 10, 3, 8]
count = 0
for i = 0 to __(i)__
    if nums[i] __(ii)__ 2 == 0 then
        count = __(iii)__
    endif
next i
print(__(iv)__)`,
    parts: [
      { t: 'short', m: 1, p: 'Complete gap (i).', a: ['4', 'nums.length-1', 'len(nums)-1'], ms: ['4 (or nums.length - 1)'] },
      { t: 'short', m: 1, p: 'Complete gap (ii).', a: ['mod', '%'], ms: ['MOD'] },
      { t: 'short', m: 1, p: 'Complete gap (iii).', a: ['count+1'], ms: ['count + 1'] },
      { t: 'short', m: 1, p: 'Complete gap (iv).', a: ['count'], ms: ['count'] },
      { t: 'short', m: 1, p: 'State the output of the completed algorithm.', a: ['3'], ms: ['3 (4, 10 and 8)'] },
    ],
  },
  {
    id: 'p2b-refine', paper: 2, topic: '2.3', section: 'B',
    ctx: 'This algorithm asks the user to log in. It currently allows unlimited attempts.',
    code: `password = "Secret99"
attempt = input("Enter password")
while attempt != password
    print("Incorrect")
    attempt = input("Enter password")
endwhile
print("Welcome")`,
    parts: [
      { t: 'written', code: true, m: 5, p: 'Refine the algorithm so that the user only gets 3 attempts. If all 3 are wrong, output "Account locked" instead of "Welcome".', ms: ['Initialise an attempts counter', 'Increment the counter for each attempt', 'Loop condition checks both password and attempts (e.g. AND attempts < 3)', 'After loop, if password correct output "Welcome"', 'Else output "Account locked"'] },
    ],
  },
];
