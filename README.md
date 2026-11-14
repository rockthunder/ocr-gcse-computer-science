# J277 Exam Trainer: OCR GCSE Computer Science

**Live app: https://rockthunder.github.io/ocr-gcse-computer-science/**

A React app for revising **OCR GCSE (9–1) Computer Science J277**. It covers both papers:
**J277/01 Computer systems** and **J277/02 Computational thinking, algorithms and programming**.

## Modes

1. **Quick-fire diagnostic**: multiple-choice questions spread evenly across all 11 specification topics (22, 33 or 55 questions, with an optional 20-second timer per question). You get instant feedback and explanations, then a weakest-first topic breakdown with one-click deep dives.
2. **Topic deep dive**: pick any topic (1.1–2.5) to get its key revision points, every practice MCQ for that topic, and the exam-style questions for that topic with mark schemes.
3. **GCSE exam simulation**: choose Paper 1, Paper 2 or Mixed, and a time of 10, 15, 20, 30, 45 or 60 minutes, or the full 1 h 30. The paper is sized at the real exam rate (80 marks in 90 minutes), so 15 minutes gives about 13 marks and 90 minutes gives 80. The questions follow the style of OCR past papers:
   - scenario-based questions with lettered parts, OCR command words and marks in [brackets]
   - binary/hex conversions, file-size calculations, protocol and data-type tables
   - trace tables, truth tables and SQL
   - an 8-mark levels-of-response "Discuss" question on Paper 1 for sittings of 45 minutes or more
   - Paper 2 Section B programming questions (OCR Exam Reference Language or Python), roughly 30/80 of the marks

   A countdown runs during the exam. When it ends, the paper is collected and you mark it. Short answers, tick boxes and tables are auto-marked (you can override them). Written answers are self-marked by ticking mark-scheme points, with keyword-based suggestions. Results show your score, an indicative grade, and marks by topic and by question. An exam in progress survives a page reload.

Progress (topic mastery and recent activity) is stored in the browser's `localStorage`.

## Running

```bash
npm install
npm run dev        # local dev server
npm run build      # production build in dist/ (relative paths, so it can be hosted anywhere)
npm run validate   # checks the question banks and that generated papers hit their target marks
```

Every push to `main` is validated, built and deployed to GitHub Pages by `.github/workflows/deploy.yml`.

## Project layout

```
src/data/topics.js   specification topics + key revision points
src/data/mcq.js      quick-fire multiple-choice bank
src/data/paper1.js   Paper 1 exam-style questions (incl. 8-mark extended responses)
src/data/paper2.js   Paper 2 exam-style questions (Section A and Section B)
src/lib/generate.js  builds a timed paper from the banks
src/lib/marking.js   auto-marking and mark-scheme suggestions
src/components/      QuickFire, DeepDive, Simulation, ExamGroup, McqRunner, TopicBars
```

To add questions, append to the relevant file in `src/data/` (the part types are documented at the top of `paper1.js`), then run `npm run validate`.

## Disclaimer

This is an unofficial revision tool. The questions are original and written in the style of OCR papers. They are not OCR material. Indicative grades are a rough guide only, because real grade boundaries change each series. See the official past papers and mark schemes at
https://www.ocr.org.uk/qualifications/gcse/computer-science-j277-from-2020/assessment/
