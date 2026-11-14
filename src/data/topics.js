// OCR GCSE Computer Science J277 specification topics.
// Paper 1 (J277/01) Computer systems; Paper 2 (J277/02) Computational thinking, algorithms and programming.

export const PAPERS = {
  1: { id: 1, code: 'J277/01', name: 'Computer systems', minutes: 90, marks: 80 },
  2: { id: 2, code: 'J277/02', name: 'Computational thinking, algorithms and programming', minutes: 90, marks: 80 },
};

export const TOPICS = [
  {
    id: '1.1', paper: 1, name: 'Systems architecture',
    notes: [
      'The CPU fetches, decodes and executes instructions. It contains the ALU (arithmetic and logic operations), the CU (decodes instructions and sends control signals), cache and registers.',
      'Von Neumann architecture: data and instructions are stored together in the same memory. Key registers are the PC (address of the next instruction), the MAR (address being read from or written to), the MDR (data fetched or about to be written) and the Accumulator (results from the ALU).',
      'Fetch: the PC is copied to the MAR, the PC is incremented, and the instruction at that address is fetched into the MDR. Decode: the CU works out what the instruction means. Execute: the instruction is carried out.',
      'Performance depends on clock speed (cycles per second, e.g. 3.2 GHz is 3.2 billion), cache size (more fast memory, so fewer slow trips to RAM) and number of cores (several instructions processed at once, but only if the software can run tasks in parallel).',
      'Embedded systems are computers built into a larger device with a dedicated function, such as washing machines, car engine management or traffic lights. They are usually small, cheap, low-power and reliable.',
    ],
  },
  {
    id: '1.2', paper: 1, name: 'Memory and storage',
    notes: [
      'RAM is volatile, read/write, and holds the OS, programs and data currently in use. ROM is non-volatile, read-only and holds the boot-up instructions (BIOS / bootstrap).',
      'Virtual memory is part of secondary storage used as extra RAM when RAM is full. Inactive data is moved out to it, but it is much slower, so heavy use slows the computer down.',
      'Secondary storage is non-volatile. Magnetic (HDD, tape) has high capacity and low cost per GB. Optical (CD/DVD/Blu-ray) is cheap and portable but slow with low capacity. Solid state (SSD, flash) is fast, durable and has no moving parts, but costs more per GB.',
      'Units: bit, nibble (4 bits), byte (8 bits), KB (1000 bytes), MB, GB, TB, PB. OCR accepts 1000 or 1024. Binary, denary and hex conversions, binary addition (watch for overflow) and shifts (a left shift multiplies by 2 per place, a right shift divides by 2).',
      'Characters: a character set maps each character to a unique binary code. ASCII uses 7 bits (128 characters, extended ASCII has 256). Unicode uses more bits to cover every language and emoji. Character codes are sequential, so if A = 65 then D = 68.',
      'Images: pixels, colour depth and resolution, plus metadata. File size in bits = width × height × colour depth. Sound: sample rate (samples per second) and bit depth. File size in bits = sample rate × bit depth × seconds.',
      'Compression: lossy permanently removes data (MP3, JPEG), giving smaller files. Lossless lets the original be rebuilt exactly (e.g. RLE, ZIP), which is essential for text and program files.',
    ],
  },
  {
    id: '1.3', paper: 1, name: 'Networks, connections and protocols',
    notes: [
      'A LAN covers a small area with hardware owned by the organisation. A WAN covers a large geographical area using infrastructure owned by third parties. The Internet is a worldwide network of networks.',
      'Performance factors: bandwidth, the number of users, the transmission media (wired or wireless), interference, distance and errors.',
      'In a client-server network, clients request services from a central server, which handles security and backups. In a peer-to-peer network, all devices are equal and share resources directly.',
      'Hardware: a WAP lets wireless devices join a wired network; a router sends packets between networks; a switch forwards data to the correct device on a LAN using MAC addresses; a NIC connects a device to the network. Transmission media include Ethernet cable and fibre.',
      'Topologies: star (central switch; one failed cable only affects one device, but the switch is a single point of failure) and mesh (multiple routes, so it is fault tolerant but uses a lot of cabling).',
      'DNS translates domain names into IP addresses. Hosting stores website files on an internet-connected server. The cloud gives remote storage and services, accessible anywhere but dependent on an internet connection.',
      'Protocols: TCP/IP, HTTP, HTTPS (encrypted), FTP (file transfer), POP and IMAP (retrieve email; IMAP keeps it on the server), SMTP (send email). Layers let each part be developed independently.',
      'Ethernet, Wi-Fi and Bluetooth. Encryption protects intercepted data. An IP address is a logical address that can change (IPv4 is four 0–255 numbers). A MAC address is a fixed hardware address in hex.',
    ],
  },
  {
    id: '1.4', paper: 1, name: 'Network security',
    notes: [
      'Threats: malware (viruses, worms, trojans, ransomware, spyware), social engineering such as phishing (people are often the weak point), brute-force attacks, denial of service (DoS), data interception and theft, and SQL injection.',
      'Phishing uses fake messages that appear to come from a trusted organisation to trick people into revealing details. Brute force tries every possible password. DoS floods a server so genuine users cannot get in.',
      'SQL injection means typing SQL code into an input box to read, change or delete database data. Prevent it with input validation and sanitisation.',
      'Prevention: penetration testing (authorised simulated attacks that find weaknesses), anti-malware, firewalls (filter traffic using rules), user access levels, strong passwords, encryption and physical security such as locks and biometrics.',
    ],
  },
  {
    id: '1.5', paper: 1, name: 'Systems software',
    notes: [
      'Operating system functions: the user interface (GUI or CLI), memory management and multitasking, peripheral management with device drivers, user management, and file management.',
      'Memory management allocates RAM to programs, stops programs from overwriting each other, and moves data between RAM and virtual memory. Multitasking switches the CPU between processes.',
      'Device drivers translate OS commands into instructions that a particular piece of hardware understands.',
      'Utility software: encryption software, defragmentation (rearranges a HDD so file parts are stored together, giving faster access; not needed for SSDs), and data compression.',
      'Backups: a full backup copies everything. An incremental backup only copies what has changed since the last backup, so it is faster and smaller, but slower to restore.',
    ],
  },
  {
    id: '1.6', paper: 1, name: 'Ethical, legal, cultural & environmental impacts',
    notes: [
      'Ethical issues include privacy, surveillance, AI bias, the digital divide, job losses through automation, and censorship.',
      'Cultural issues include changes to how people communicate, work and shop, as well as online behaviour and access to technology.',
      'Environmental issues include e-waste with toxic materials, energy use by data centres, mining rare metals, and positive effects such as smart energy management and less travel.',
      'Legislation: the Data Protection Act 2018 (personal data processed fairly and lawfully, kept secure and accurate, not kept longer than needed; people can see their data), the Computer Misuse Act 1990 (unauthorised access, access with intent to commit further crime, unauthorised modification), and the Copyright, Designs and Patents Act 1988 (protects creative work, including software).',
      'Open source software has source code that is freely available and modifiable, with community support. Proprietary software has closed source, is paid for or licensed, and comes with official support.',
      'In 8-mark "Discuss" questions, cover several areas (ethical, legal, cultural, environmental or privacy), give both sides, use the scenario, and finish with a reasoned conclusion.',
    ],
  },
  {
    id: '2.1', paper: 2, name: 'Algorithms',
    notes: [
      'Computational thinking: abstraction (removing unnecessary detail), decomposition (breaking a problem into smaller sub-problems) and algorithmic thinking (working out the steps to a solution).',
      'Identify the inputs, processes and outputs of a problem. Algorithms are shown with structure diagrams, flowcharts (oval for start/end, parallelogram for input/output, rectangle for a process, diamond for a decision) and pseudocode or OCR Exam Reference Language.',
      'Linear search checks every item in turn and works on unsorted data. Binary search needs sorted data: it checks the middle item and discards half the list each time.',
      'Bubble sort compares adjacent pairs and swaps them, repeating passes until no swaps are made. Merge sort splits the list into single items, then merges them back in order, which is efficient for large lists. Insertion sort inserts each item into the correct place in the sorted part of the list.',
      'Trace tables track the values of variables line by line. They are used to find logic errors and to work out what an algorithm does.',
    ],
  },
  {
    id: '2.2', paper: 2, name: 'Programming fundamentals',
    notes: [
      'Variables and constants, operators and inputs/outputs. The three constructs are sequence, selection (if, switch) and iteration: count-controlled (for) and condition-controlled (while, do…until).',
      'Arithmetic operators: + - * / plus MOD (remainder), DIV (whole-number division) and ^ (exponent). Comparison operators: == != < <= > >=. Boolean operators: AND, OR, NOT.',
      'Data types: integer, real (float), Boolean, character and string. Casting converts between types, e.g. int("5") or str(42).',
      'String handling in OCR ERL: .length, .substring(start, length), .upper and .lower, ASC() and CHR(). File handling: open(), readLine(), writeLine(), endOfFile(), close() and newFile().',
      'Arrays (1D and 2D) are zero-indexed. Records group related fields. SQL: SELECT fields FROM table WHERE condition, where * means all fields.',
      'Subprograms: functions return a value and procedures do not. They make code reusable, easier to test and easier to maintain. Local variables only exist inside a subprogram; global variables can be used anywhere. random(1,6) gives a random integer from 1 to 6.',
    ],
  },
  {
    id: '2.3', paper: 2, name: 'Producing robust programs',
    notes: [
      'Defensive design: anticipate misuse, use authentication (e.g. passwords), and apply input validation (range, type, length, presence and format checks) and sanitisation.',
      'Maintainability: comments, sensible identifiers, indentation, subprograms and constants.',
      'Testing: iterative testing during development and final (terminal) testing at the end. A syntax error breaks the rules of the language, so the program will not run. A logic error means the program runs but gives the wrong result.',
      'Test data types: normal (typical valid data), boundary (data at the edge of the valid range), invalid (correct data type but outside the range) and erroneous (wrong data type).',
    ],
  },
  {
    id: '2.4', paper: 2, name: 'Boolean logic',
    notes: [
      'AND outputs 1 only if both inputs are 1. OR outputs 1 if either input is 1. NOT inverts its input.',
      'Gate symbols: AND is a D-shape, OR is a curved shield shape, and NOT is a triangle with a small circle.',
      'Truth tables list every input combination. n inputs give 2ⁿ rows, so 3 inputs give 8 rows.',
      'Combine gates into expressions such as P = (A OR B) AND NOT C. Work out brackets first, using extra columns for intermediate results.',
    ],
  },
  {
    id: '2.5', paper: 2, name: 'Programming languages and IDEs',
    notes: [
      'High-level languages are written in English-like statements. They are easier to read, write and debug, and are portable, but must be translated. Low-level languages (machine code and assembly) give direct hardware control and efficient code, but are hard to write.',
      'Translators: a compiler translates the whole program into an executable, which runs fast and does not share the source code, but errors are reported only at the end. An interpreter translates and runs line by line and stops at the first error, which is good for debugging, but it is slower and the translator is needed each time. An assembler translates assembly language.',
      'IDE tools: the editor (auto-indent, syntax highlighting, auto-complete), error diagnostics, a run-time environment, a translator, and debugging tools such as breakpoints, stepping and watching variables.',
    ],
  },
];

export const topicById = Object.fromEntries(TOPICS.map((t) => [t.id, t]));
