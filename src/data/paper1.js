// Paper 1 (J277/01) Computer systems — exam-style questions modelled on OCR past papers.
// Part types:
//   written  — free text, self-marked against mark-scheme points (1 mark per point, capped at m)
//   short    — short answer auto-marked against accepted answers `a`
//   mcq      — "tick one box" auto-marked; `ans` is the correct index
//   table    — grid; cells are strings (given) or {a: [...accepted]} / {a: 'X', opts: [...]} (dropdown)
//   extended — 8-mark levels-of-response question, `ms` holds indicative content

export const PAPER1 = [
  {
    id: 'p1-cpu', paper: 1, topic: '1.1',
    ctx: 'Jamal\'s computer contains a CPU based on the Von Neumann architecture.',
    parts: [
      { t: 'written', m: 2, p: 'State the purpose of the CPU.', ms: ['Fetches instructions (from memory)', 'Decodes instructions', 'Executes instructions / processes data'] },
      { t: 'short', m: 1, p: 'Identify the register that holds the address of the next instruction to be fetched.', a: ['program counter', 'pc', 'the program counter', 'program counter (pc)'], ms: ['Program Counter (PC)'] },
      { t: 'written', m: 4, p: 'Describe the purpose of the MAR and the MDR.', ms: ['MAR holds an address…', '…of the memory location to be read from / written to', 'MDR holds data / an instruction…', '…that has been fetched from memory / is about to be written to memory'] },
      { t: 'written', m: 2, p: 'Jamal is thinking of buying a computer with more cores. Explain how increasing the number of cores could affect the performance of the CPU.', ms: ['More instructions can be processed at the same time / in parallel', 'So performance can improve / more tasks completed per second', 'But only if the software is designed to use multiple cores / tasks can be split'] },
    ],
  },
  {
    id: 'p1-fde', paper: 1, topic: '1.1',
    ctx: 'A games console has a 3.5 GHz quad-core processor with 8 MB of cache.',
    parts: [
      { t: 'written', m: 1, p: 'Define the term clock speed.', ms: ['The number of fetch-decode-execute cycles (instructions) per second'] },
      { t: 'written', m: 2, p: 'Explain how the size of the cache affects the performance of the CPU.', ms: ['Cache stores frequently used data / instructions', 'Cache is faster to access than RAM', 'A larger cache can store more data so fewer (slower) trips to RAM are needed'] },
      { t: 'written', m: 3, p: 'Describe what happens during the fetch stage of the fetch-decode-execute cycle.', ms: ['The address in the PC is copied to the MAR', 'The PC is incremented (by 1)', 'The instruction at the address in the MAR is fetched from memory', 'The instruction is stored in the MDR'] },
      {
        t: 'table', m: 3, p: 'Complete the table by choosing the CPU component that matches each description.',
        cols: ['Description', 'Component'],
        rows: [
          ['Carries out calculations and logical comparisons', { a: 'ALU', opts: ['ALU', 'CU', 'Cache', 'Accumulator'] }],
          ['Decodes instructions and sends control signals', { a: 'CU', opts: ['ALU', 'CU', 'Cache', 'Accumulator'] }],
          ['Small, fast memory storing frequently used instructions', { a: 'Cache', opts: ['ALU', 'CU', 'Cache', 'Accumulator'] }],
        ],
      },
    ],
  },
  {
    id: 'p1-embedded', paper: 1, topic: '1.1',
    ctx: 'A smart thermostat contains an embedded system.',
    parts: [
      { t: 'written', m: 2, p: 'Describe what is meant by an embedded system.', ms: ['A computer system built into a larger device / machine', 'That has a dedicated / specific function', 'Often has limited / no user interface, or is controlled by its own software'] },
      { t: 'written', m: 2, p: 'Give two other examples of devices that contain embedded systems.', ms: ['Washing machine / dishwasher', 'Microwave', 'Car engine management / satnav', 'Traffic lights', 'Digital camera / smart TV / fitness tracker (any valid, 1 mark each)'] },
      { t: 'written', m: 2, p: 'Explain one reason why an embedded system is used in the thermostat rather than a general-purpose computer.', ms: ['Smaller / cheaper / uses less power', 'Because it only has to perform one task so does not need the power of a general-purpose computer / more reliable as dedicated'] },
    ],
  },
  {
    id: 'p1-primary', paper: 1, topic: '1.2',
    ctx: 'A laptop has 8 GB of RAM and some ROM. It also makes use of virtual memory.',
    parts: [
      { t: 'written', m: 2, p: 'State two differences between RAM and ROM.', ms: ['RAM is volatile, ROM is non-volatile', 'RAM can be read and written to, ROM is read-only', 'RAM stores programs/data currently in use, ROM stores the boot-up instructions / BIOS', 'RAM usually has a larger capacity than ROM'] },
      { t: 'written', m: 3, p: 'Explain why the laptop might need virtual memory and how virtual memory is used.', ms: ['When RAM is full', 'Part of secondary storage is used as (temporary) RAM', 'Data / programs not currently in use are moved from RAM to virtual memory', 'Data is moved back into RAM when it is needed'] },
      { t: 'written', m: 2, p: 'Explain how adding more RAM to the laptop could improve its performance.', ms: ['More data / programs can be held in RAM at once', 'Less need to use virtual memory', 'Virtual memory is slower to access as it is on secondary storage'] },
    ],
  },
  {
    id: 'p1-secondary', paper: 1, topic: '1.2',
    ctx: 'A photographer needs a portable storage device to take to photo shoots, and storage to back up 50 TB of old photos.',
    parts: [
      { t: 'written', m: 3, p: 'Identify the most suitable type of secondary storage for the portable device. Justify your choice.', ms: ['Solid state (e.g. SSD / flash drive / memory card)', 'Durable / robust / no moving parts so less likely to be damaged if dropped', 'Small / lightweight / portable', 'Fast access speed so photos can be transferred quickly'] },
      { t: 'written', m: 2, p: 'Explain why magnetic storage would be suitable for the 50 TB backup.', ms: ['High capacity', 'Low cost per GB / cheap for large amounts of data', 'Does not need to be portable so durability / moving parts is not an issue'] },
      { t: 'short', m: 2, p: 'Each photo is 6 MB. Calculate how many photos can be stored on a 3 GB memory card. Show your working.', a: ['500', '512', '500 photos', '512 photos'], ms: ['3 GB = 3000 MB (or 3072 MB)', '3000 ÷ 6 = 500 (or 3072 ÷ 6 = 512)'] },
    ],
  },
  {
    id: 'p1-binary', paper: 1, topic: '1.2',
    ctx: 'Computers store all data in binary.',
    parts: [
      { t: 'short', m: 1, p: 'Convert the binary number 11001010 into denary.', a: ['202'], ms: ['202'] },
      { t: 'short', m: 1, p: 'Convert the denary number 87 into an 8-bit binary number.', a: ['01010111', '1010111'], ms: ['01010111'] },
      { t: 'short', m: 1, p: 'Convert the hexadecimal number 9C into binary.', a: ['10011100'], ms: ['10011100'] },
      { t: 'short', m: 1, p: 'Convert the binary number 10101111 into hexadecimal.', a: ['af'], ms: ['AF'] },
      { t: 'short', m: 2, p: 'Add the binary numbers 10011011 and 01101101. Give your answer as a 9-bit binary number.', a: ['100001000'], ms: ['1 mark for correct working / carries', '100001000'] },
      { t: 'written', m: 2, p: 'The computer stores numbers in 8-bit registers. Explain why the addition above would cause an error.', ms: ['Overflow (error)', 'The result (264) is greater than 255 / needs 9 bits but only 8 are available'] },
      { t: 'short', m: 1, p: 'Give the result of performing a 2-place right shift on 01011000.', a: ['00010110', '10110'], ms: ['00010110'] },
      { t: 'mcq', m: 1, p: 'State the effect of the 2-place right shift on the number. Tick one box.', opts: ['Divides it by 4', 'Multiplies it by 4', 'Divides it by 2', 'Multiplies it by 2'], ans: 0, ms: ['Divides by 4 (88 → 22)'] },
    ],
  },
  {
    id: 'p1-chars-images', paper: 1, topic: '1.2',
    ctx: 'A website stores text using a character set and displays bitmap images.',
    parts: [
      { t: 'written', m: 2, p: 'Describe what is meant by a character set.', ms: ['A defined list of characters recognised by the computer', 'Each character is given a unique binary code / number'] },
      { t: 'short', m: 1, p: 'The ASCII code for \'a\' is 97. State the ASCII code for \'e\'.', a: ['101'], ms: ['101'] },
      { t: 'written', m: 2, p: 'Explain one reason why the website might use Unicode instead of ASCII.', ms: ['Unicode can represent many more characters than ASCII', 'So it can display other languages / alphabets / symbols / emoji'] },
      { t: 'short', m: 3, p: 'An image is 800 pixels wide and 600 pixels high with a colour depth of 24 bits. Calculate the file size in kilobytes (KB). Show your working.', a: ['1440', '1440kb', '1406.25', '1406.25kb', '1406', '1406kb'], ms: ['800 × 600 × 24 = 11 520 000 bits', '÷ 8 = 1 440 000 bytes', '÷ 1000 = 1440 KB (or ÷ 1024 = 1406.25 KB)'] },
      { t: 'written', m: 2, p: 'Explain the effect of increasing the colour depth of the image.', ms: ['More colours can be represented', 'So image quality is better / more accurate colours', 'But the file size increases'] },
    ],
  },
  {
    id: 'p1-sound', paper: 1, topic: '1.2',
    ctx: 'A music streaming service records and stores songs digitally.',
    parts: [
      { t: 'written', m: 3, p: 'Describe how an analogue sound is stored digitally.', ms: ['The amplitude / height of the sound wave is measured', 'At regular intervals / sample rate number of times per second', 'Each sample is converted to / stored as a binary number', 'Using a fixed number of bits (bit depth)'] },
      { t: 'short', m: 2, p: 'A sound is recorded with a sample rate of 8000 Hz and a bit depth of 16 bits for 10 seconds. Calculate the file size in kilobytes (KB). Show your working.', a: ['160', '160kb', '156.25', '156.25kb'], ms: ['8000 × 16 × 10 = 1 280 000 bits', '÷ 8 ÷ 1000 = 160 KB (or ÷ 8 ÷ 1024 = 156.25 KB)'] },
      { t: 'written', m: 4, p: 'Explain the difference between lossy and lossless compression, and justify which type the streaming service should use.', ms: ['Lossy permanently removes data', 'Lossless – original file can be restored exactly / no data is lost', 'Lossy – the streaming service should use lossy compression', 'Gives much smaller files so songs stream faster / use less bandwidth / less buffering', 'Loss in quality is unlikely to be noticed by listeners'] },
    ],
  },
  {
    id: 'p1-lan', paper: 1, topic: '1.3',
    ctx: 'A school has a LAN that uses a star topology.',
    parts: [
      { t: 'written', m: 2, p: 'Describe two differences between a LAN and a WAN.', ms: ['LAN covers a small geographical area, WAN covers a large geographical area', 'LAN hardware is owned by the organisation, WAN uses infrastructure owned by third parties / telecoms companies'] },
      { t: 'written', m: 2, p: 'Describe how devices are connected in a star topology.', ms: ['Each device is connected to a central switch', 'Data is sent via the switch to the correct device'] },
      { t: 'written', m: 2, p: 'Give one advantage and one disadvantage of the star topology for the school.', ms: ['Advantage: if one cable / device fails only that device is affected / easy to add devices / fewer collisions', 'Disadvantage: if the central switch fails the whole network fails / needs more cable than some topologies / switch is expensive'] },
      { t: 'short', m: 1, p: 'Identify the hardware device that connects the school\'s network to the Internet.', a: ['router', 'a router'], ms: ['Router'] },
      { t: 'written', m: 4, p: 'Explain two factors that could affect the performance of the school\'s network.', ms: ['Bandwidth…', '…higher bandwidth means more data can be sent per second', 'Number of users / devices…', '…more devices sharing bandwidth means slower speeds / more collisions', 'Transmission media e.g. wired vs wireless / interference / distance / errors (with explanation)'] },
    ],
  },
  {
    id: 'p1-protocols', paper: 1, topic: '1.3',
    ctx: 'Networks use protocols to communicate.',
    parts: [
      {
        t: 'table', m: 4, p: 'Complete the table by choosing the most suitable protocol for each task.',
        cols: ['Task', 'Protocol'],
        rows: [
          ['Sending an email', { a: 'SMTP', opts: ['SMTP', 'FTP', 'HTTPS', 'IMAP', 'TCP'] }],
          ['Transferring files between computers on a network', { a: 'FTP', opts: ['SMTP', 'FTP', 'HTTPS', 'IMAP', 'TCP'] }],
          ['Accessing a secure web page', { a: 'HTTPS', opts: ['SMTP', 'FTP', 'HTTPS', 'IMAP', 'TCP'] }],
          ['Reading emails that are kept on the mail server', { a: 'IMAP', opts: ['SMTP', 'FTP', 'HTTPS', 'IMAP', 'TCP'] }],
        ],
      },
      { t: 'written', m: 3, p: 'Describe the role of DNS when a user types a URL into a web browser.', ms: ['The URL / domain name is sent to a DNS server', 'The DNS server looks up the domain name / IP address in its database', 'The matching IP address is returned to the browser', 'If not found the request is passed to another DNS server', 'Browser uses the IP address to contact the web server'] },
      { t: 'written', m: 2, p: 'Explain one benefit of using layers in network protocols.', ms: ['Each layer is self-contained / deals with one aspect', 'So layers can be developed / changed independently without affecting others', 'Allows different hardware / software from different manufacturers to work together (interoperability)'] },
      { t: 'written', m: 2, p: 'State one difference between an IP address and a MAC address.', ms: ['IP address is a logical address, MAC address is a physical / hardware address', 'IP address can change, MAC address is fixed (assigned by manufacturer)', 'IP used to route between networks, MAC used to identify devices on a LAN', 'IPv4 written as 4 denary numbers, MAC as 6 pairs of hex'] },
    ],
  },
  {
    id: 'p1-wired-cloud', paper: 1, topic: '1.3',
    ctx: 'A small design company is setting up a new office network and is considering using cloud storage.',
    parts: [
      { t: 'written', m: 4, p: 'Compare the use of Ethernet and Wi-Fi to connect the office computers.', ms: ['Ethernet is usually faster', 'Ethernet is more reliable / less interference', 'Ethernet is more secure / harder to intercept', 'Wi-Fi allows mobility / users can move around', 'Wi-Fi needs no cables so is cheaper / easier to install / add devices'] },
      { t: 'written', m: 3, p: 'Give two advantages and one disadvantage to the company of using cloud storage.', ms: ['Advantage: files can be accessed from anywhere / any device', 'Advantage: storage can be increased easily / scalable', 'Advantage: no need to buy / maintain own hardware / backups handled by provider', 'Disadvantage: needs an internet connection / reliance on provider security / ongoing subscription cost / data protection concerns'] },
      { t: 'written', m: 2, p: 'Explain why encryption is used on the office Wi-Fi network.', ms: ['Wireless signals can be intercepted by anyone in range', 'Encryption means intercepted data cannot be understood without the key'] },
    ],
  },
  {
    id: 'p1-threats', paper: 1, topic: '1.4',
    ctx: 'A bank provides an online banking website for its customers.',
    parts: [
      { t: 'written', m: 3, p: 'Describe what phishing is and give one way the bank\'s customers can protect themselves.', ms: ['Fake emails / messages / websites pretending to be from a trusted organisation (e.g. the bank)', 'Trying to trick the user into giving personal details / passwords / clicking a link', 'Protection: check sender address / don\'t click links / spam filters / user education / bank never asks for full passwords'] },
      { t: 'written', m: 3, p: 'Explain how an SQL injection attack works and how the bank could prevent it.', ms: ['Attacker enters SQL code into an input box / form', 'Which is run by the database, allowing data to be viewed / changed / deleted', 'Prevention: input validation / sanitisation (e.g. removing special characters) / parameterised queries'] },
      { t: 'written', m: 3, p: 'Describe a brute-force attack and give two ways the bank can protect against it.', ms: ['Trying every possible password combination (using software) until the correct one is found', 'Lock the account after a set number of failed attempts', 'Require strong passwords (long, mixed characters)', 'Two-factor authentication / CAPTCHA'] },
    ],
  },
  {
    id: 'p1-prevention', paper: 1, topic: '1.4',
    ctx: 'A hospital wants to protect its network from attack.',
    parts: [
      { t: 'written', m: 2, p: 'Explain what is meant by penetration testing.', ms: ['Authorised / simulated attacks on the network', 'To find weaknesses / vulnerabilities so they can be fixed (before criminals exploit them)'] },
      { t: 'written', m: 2, p: 'Explain how a firewall protects the hospital\'s network.', ms: ['Monitors incoming and outgoing traffic', 'Blocks / filters traffic that does not meet a set of rules / from unauthorised sources'] },
      { t: 'written', m: 2, p: 'Describe how user access levels could be used in the hospital.', ms: ['Different users are given different permissions / access rights', 'e.g. doctors can read and edit patient records, receptionists can only view appointment details'] },
      { t: 'written', m: 2, p: 'Explain why people are often described as the weakest point in a network\'s security.', ms: ['People can be tricked by social engineering / phishing', 'They may use weak passwords / share passwords / leave computers unlocked / insert infected USB drives'] },
      { t: 'written', m: 2, p: 'Describe what a denial of service (DoS) attack is and its impact on the hospital.', ms: ['Server / network is flooded with requests / traffic', 'So genuine users / staff cannot access the system / services slow down or become unavailable'] },
    ],
  },
  {
    id: 'p1-os', paper: 1, topic: '1.5',
    ctx: 'Every computer needs an operating system.',
    parts: [
      { t: 'written', m: 3, p: 'State three functions of an operating system.', ms: ['Provides a user interface', 'Memory management / multitasking', 'Peripheral management / device drivers', 'User management', 'File management'] },
      { t: 'written', m: 3, p: 'Describe how the operating system manages memory.', ms: ['Allocates memory (RAM) to programs / processes', 'Ensures programs do not overwrite each other\'s memory', 'Moves data between RAM and virtual memory when RAM is full', 'Frees memory when a program closes'] },
      { t: 'written', m: 2, p: 'Explain the purpose of a device driver.', ms: ['Software that allows the OS to communicate with a hardware device / peripheral', 'Translates OS instructions into a form the specific device understands'] },
    ],
  },
  {
    id: 'p1-utility', paper: 1, topic: '1.5',
    ctx: 'A user\'s computer has a magnetic hard disk drive that has become slow.',
    parts: [
      { t: 'written', m: 3, p: 'Explain how defragmentation software could improve the performance of the computer.', ms: ['Over time files are split into fragments stored in different places on the disk', 'Defragmentation moves the fragments so each file is stored contiguously / together', 'Free space is also grouped together', 'The read/write head moves less so files are accessed faster'] },
      { t: 'written', m: 2, p: 'Describe the difference between a full backup and an incremental backup.', ms: ['Full backup copies all files / data', 'Incremental backup only copies files that have changed since the last backup'] },
      { t: 'written', m: 1, p: 'Give one advantage of an incremental backup.', ms: ['Faster to carry out / uses less storage space'] },
      { t: 'written', m: 2, p: 'Explain why compression software is useful when sending files by email.', ms: ['Reduces the file size', 'So files upload / download faster / fit within attachment size limits / use less bandwidth'] },
    ],
  },
  {
    id: 'p1-law', paper: 1, topic: '1.6',
    ctx: 'Several laws apply to the use of computers in the UK.',
    parts: [
      {
        t: 'table', m: 3, p: 'Identify the law that has been broken in each scenario.',
        cols: ['Scenario', 'Law'],
        rows: [
          ['An employee guesses a colleague\'s password and reads their emails', { a: 'Computer Misuse Act 1990', opts: ['Computer Misuse Act 1990', 'Data Protection Act 2018', 'Copyright, Designs and Patents Act 1988'] }],
          ['A company sells its customers\' personal details without consent', { a: 'Data Protection Act 2018', opts: ['Computer Misuse Act 1990', 'Data Protection Act 2018', 'Copyright, Designs and Patents Act 1988'] }],
          ['A student copies a game and shares it online', { a: 'Copyright, Designs and Patents Act 1988', opts: ['Computer Misuse Act 1990', 'Data Protection Act 2018', 'Copyright, Designs and Patents Act 1988'] }],
        ],
      },
      { t: 'written', m: 2, p: 'Give one advantage and one disadvantage to a small business of using open source software.', ms: ['Advantage: usually free / can be modified to suit needs / community support / code can be checked for security', 'Disadvantage: may have limited official support / may be less polished / compatibility issues / may need technical skill to modify'] },
      { t: 'written', m: 2, p: 'Describe two principles of the Data Protection Act 2018 that a company storing customer data must follow.', ms: ['Data must be used fairly, lawfully and transparently', 'Used only for the specified purpose', 'Adequate, relevant and not excessive', 'Accurate and kept up to date', 'Not kept longer than necessary', 'Kept secure'] },
    ],
  },
  {
    id: 'p1-ext-cctv', paper: 1, topic: '1.6', extended: true,
    ctx: 'A city council plans to install CCTV cameras with artificial intelligence (AI) facial recognition across the town centre. The system will identify people in real time and keep the footage on a cloud server.',
    parts: [
      {
        t: 'extended', m: 8,
        p: 'Discuss the ethical, legal and privacy issues of the council introducing this system. In your answer you might consider: ethical issues; legal issues; privacy issues.',
        ms: [
          'Ethical: may reduce crime / help find missing people – benefits public safety',
          'Ethical: AI may be biased / misidentify people, leading to wrongful arrests; who is accountable?',
          'Ethical: chilling effect – people may change behaviour, freedom of movement / protest',
          'Legal: Data Protection Act 2018 – images of faces are personal (biometric) data, must be processed lawfully, kept secure, not kept longer than necessary, used for stated purpose',
          'Legal: people have the right to access footage of themselves (subject access request)',
          'Legal: cloud server must be protected – Computer Misuse Act if hacked; data may be stored abroad',
          'Privacy: constant surveillance without consent; tracking individuals\' movements',
          'Privacy: risk of data breach / misuse by staff; who can access the data',
          'Conclusion: balanced judgement weighing safety benefits against privacy / bias risks',
        ],
      },
    ],
  },
  {
    id: 'p1-ext-upgrade', paper: 1, topic: '1.6', extended: true,
    ctx: 'A large company replaces all of its staff laptops every two years so that employees always have the latest technology.',
    parts: [
      {
        t: 'extended', m: 8,
        p: 'Discuss the environmental, ethical and cultural impacts of the company\'s policy. In your answer you might consider: environmental impacts; ethical issues; cultural issues.',
        ms: [
          'Environmental: e-waste – old devices contain toxic materials (lead, mercury) that can pollute land / water',
          'Environmental: mining rare metals and manufacturing new devices uses energy and resources / carbon emissions',
          'Environmental: newer devices may be more energy efficient, reducing energy use',
          'Environmental: devices could be recycled / refurbished / donated rather than thrown away',
          'Ethical: e-waste often shipped to developing countries, unsafe working conditions for recyclers',
          'Ethical: data on old devices must be securely wiped (Data Protection)',
          'Ethical / cultural: donating old laptops could reduce the digital divide',
          'Cultural: staff expect latest technology; productivity / staff morale; pressure to keep up with trends',
          'Conclusion: balanced judgement e.g. extend lifespan or recycle responsibly',
        ],
      },
    ],
  },
  {
    id: 'p1-ext-autonomous', paper: 1, topic: '1.6', extended: true,
    ctx: 'A supermarket plans to replace its delivery drivers with self-driving electric delivery vans.',
    parts: [
      {
        t: 'extended', m: 8,
        p: 'Discuss the impact of the supermarket introducing self-driving delivery vans. In your answer you might consider: ethical issues; legal issues; environmental issues; cultural issues.',
        ms: [
          'Ethical: delivery drivers lose their jobs; need for retraining; new technical jobs created',
          'Ethical: who decides how the van behaves in an unavoidable accident? Who is responsible?',
          'Ethical / safety: may reduce accidents caused by human error, or software bugs may cause accidents',
          'Legal: who is liable in a crash – supermarket, manufacturer, programmer?',
          'Legal: vans collect location / camera data – Data Protection Act; hacking – Computer Misuse Act',
          'Environmental: electric vans produce fewer emissions; efficient route planning saves energy',
          'Environmental: manufacturing batteries / sensors uses resources; e-waste',
          'Cultural: customers may not trust driverless vehicles; elderly customers lose human contact; changes to how people shop',
          'Conclusion: balanced judgement weighing benefits and drawbacks',
        ],
      },
    ],
  },
  {
    id: 'p1-storage-units', paper: 1, topic: '1.2',
    ctx: 'Data storage is measured in different units.',
    parts: [
      { t: 'mcq', m: 1, p: 'Which of the following is the largest? Tick one box.', opts: ['2 TB', '1500 GB', '900 000 MB', '3 000 000 KB'], ans: 0, ms: ['2 TB (= 2000 GB)'] },
      { t: 'short', m: 1, p: 'State how many bits are in a nibble.', a: ['4', 'four'], ms: ['4'] },
      { t: 'written', m: 2, p: 'Explain why computers use binary to represent data.', ms: ['Computers are made of switches / transistors / circuits', 'Which have only two states (on / off) represented by 1 and 0'] },
      { t: 'short', m: 1, p: 'Using run-length encoding, the data WWWWWBBBWW is stored as pairs of count and character. Write the encoded data.', a: ['5w3b2w', '5w 3b 2w', '5,w,3,b,2,w'], ms: ['5W3B2W'] },
    ],
  },
];
