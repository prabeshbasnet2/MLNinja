import { useState } from 'react';

// ─────────────────────────────────────────────────────────────────────────────
// To add a new summarised doc: append a new object to PHASES below.
// Each phase has: id, num, badgeClass, eyebrow, title, sections[].
// Each section has: id, num, title, content[].
// Content block types: p | h3 | callout | list | steps | table | equation | shape-grid | checklist
// ─────────────────────────────────────────────────────────────────────────────

const PHASES = [
  {
    id: 'phase-1',
    num: '1',
    badgeClass: 'ds-badge-green',
    eyebrow: 'Phase one · No formulas',
    title: 'How to think like a data scientist',
    sections: [
      {
        id: 'what-is-data',
        num: '1.1',
        title: 'What is data?',
        content: [
          { type: 'p', text: 'Data is <strong>recorded observations about the world.</strong> The moment you write something down — a number, a word, a yes/no — you have data.' },
          { type: 'p', text: 'You wake up at 7:14 am. Temperature is 18°C. You walked 340 steps to the kitchen. Every one of those is data. Data scientists do this at massive scale, for millions of observations at once, and then ask: what is all of this telling us?' },
          { type: 'callout', variant: 'key', text: 'Data is not mysterious. It is just anything you have noticed and written down.' },
        ],
      },
      {
        id: 'what-is-pattern',
        num: '1.2',
        title: 'What is a pattern?',
        content: [
          { type: 'p', text: 'Every day this week it rained in the afternoon. Without anyone telling you, your brain says: it will probably rain Friday too. That is pattern recognition — you took observations and found something repeating in them.' },
          { type: 'p', text: 'Data science is teaching computers to do what your brain does naturally: find repeating structure in a pile of observations.' },
          { type: 'callout', variant: 'warning', text: '<strong>Important:</strong> Not everything is a pattern. A huge part of data science is telling the difference between a real pattern and a coincidence. This is what statistics (Phase 3) handles.' },
        ],
      },
      {
        id: 'what-is-model',
        num: '1.3',
        title: 'What is a model?',
        content: [
          { type: 'p', text: 'A model is a <strong>simplified version of reality that is useful for making predictions.</strong>' },
          { type: 'list', items: [
            { bold: 'A weather map', text: ' is not real weather — it is a simplified drawing. But it lets you decide whether to bring an umbrella.' },
            { bold: 'A recipe', text: ' is not real food — it is a set of instructions that approximates how to make food.' },
            { bold: 'A machine learning model', text: ' looks at past data, finds the pattern, and builds a simplified description you can use to predict new situations.' },
          ]},
          { type: 'callout', variant: 'insight', text: 'The model will never be perfect. But "useful and approximately right" beats "perfect but impossible" every time.' },
        ],
      },
      {
        id: 'how-computers-learn',
        num: '1.4',
        title: 'How computers learn',
        content: [
          { type: 'p', text: "Imagine guessing someone's age from their face, having never seen them before. Round 1: wildly wrong. You get feedback. Round 2: you adjust. Smaller error. Round 4: closest yet." },
          { type: 'p', text: 'A machine learning algorithm does exactly this — over thousands of rounds, automatically:' },
          { type: 'steps', items: ['Make a guess (prediction)', 'Measure how wrong it was (error)', 'Adjust slightly in the right direction', 'Repeat until errors are small'] },
          { type: 'callout', variant: 'key', text: 'This loop — guess, measure error, adjust, repeat — is the engine behind every ML algorithm ever built.' },
        ],
      },
    ],
  },
  {
    id: 'phase-2',
    num: '2',
    badgeClass: 'ds-badge-blue',
    eyebrow: 'Phase two · Plain English first, symbols second',
    title: 'Gentle mathematics',
    sections: [
      {
        id: 'numbers',
        num: '2.1',
        title: 'Numbers — the four types you will always see',
        content: [
          { type: 'h3', text: 'Whole numbers (0, 1, 2, 3 …)' },
          { type: 'p', text: 'For counting things that cannot be split. You cannot have 2.5 students or attend 1.3 classes.' },
          { type: 'callout', variant: 'insight', text: '<strong>In ML:</strong> counting rows in a dataset, number of spam emails, number of predictions made.' },
          { type: 'h3', text: 'Negative numbers (… −3, −2, −1)' },
          { type: 'p', text: 'Values below zero. Temperature below freezing, money owed, a prediction that was too low.' },
          { type: 'callout', variant: 'insight', text: '<strong>In ML:</strong> errors can be negative (you predicted too low). Differences between values are often negative.' },
          { type: 'h3', text: 'Decimals (0.5, 3.14, 0.001)' },
          { type: 'p', text: 'For measuring things between whole numbers. Real-world measurements are almost never perfectly whole numbers.' },
          { type: 'callout', variant: 'insight', text: '<strong>In ML:</strong> almost everything is a decimal — probabilities, accuracy scores, model weights.' },
          { type: 'h3', text: 'Percentages (0% to 100%)' },
          { type: 'p', text: 'A percentage is just a fraction out of 100. "87% accuracy" means 87 out of every 100 predictions were correct.' },
          { type: 'callout', variant: 'insight', text: '<strong>In ML:</strong> accuracy, precision, recall — all reported as percentages.' },
        ],
      },
      {
        id: 'operations',
        num: '2.2',
        title: 'The four operations — what they actually mean',
        content: [
          { type: 'table', rows: [
            ['Addition  +', '<strong>How much altogether?</strong> Combining two amounts into one. In ML: summing errors across all predictions.'],
            ['Subtraction  −', '<strong>What is the difference?</strong> Measuring gaps. This is how prediction error is calculated: predicted − actual.'],
            ['Multiplication  ×', '<strong>How much, repeatedly?</strong> Repeated addition as a shortcut. The core operation inside every neural network.'],
            ['Division  ÷', '<strong>How much per one?</strong> Finding the fair share. Used to calculate averages: total ÷ count.'],
          ]},
          { type: 'callout', variant: 'important', text: '<strong>Subtraction</strong> — predicted minus actual — is the heartbeat of machine learning. Every algorithm starts by asking: how wrong am I right now?' },
        ],
      },
      {
        id: 'algebra',
        num: '2.3',
        title: "Algebra — the language of \"I don't know yet\"",
        content: [
          { type: 'p', text: "Algebra is not a different kind of math. It is the exact same operations you just learned, except sometimes you do not know one of the numbers yet. So you give it a name — usually x." },
          { type: 'h3', text: 'The balance rule — solving equations' },
          { type: 'p', text: 'An equation is a balanced scale. Whatever you do to one side, you must do to the other.' },
          { type: 'list', items: [
            { code: 'x + 3 = 10', text: ' — subtract 3 from both sides — x = 7' },
            { code: '2x = 14', text: ' — divide both sides by 2 — x = 7' },
            { code: '2x + 1 = 11', text: ' — subtract 1, then divide by 2 — x = 5' },
          ]},
          { type: 'h3', text: 'Key algebraic expressions' },
          { type: 'table', rows: [
            ['x + 5', 'Some unknown number with 5 added to it'],
            ['2x', 'Two times some number (number next to letter = multiply)'],
            ['x²', 'A number multiplied by itself. Used in error calculations.'],
            ['mx + b', 'The equation of a straight line. m = slope, b = starting point.'],
            ['y = f(x)', 'The definition of every ML model. Input x → function f → output y.'],
          ]},
          { type: 'equation', text: 'y = mx + b' },
          { type: 'callout', variant: 'key', text: 'Memorise y = mx + b. You will see it in every ML course, textbook, and codebase for the rest of your career.' },
        ],
      },
      {
        id: 'functions',
        num: '2.4',
        title: 'Functions — input goes in, output comes out',
        content: [
          { type: 'p', text: 'A function is a rule that turns one number into another. Same input always gives the same output. Think of a vending machine: press B3, always get chips.' },
          { type: 'p', text: 'In math notation, f(x) means "put x into the machine called f." The output is whatever comes out the other side.' },
          { type: 'h3', text: 'The four function shapes you must know' },
          { type: 'shape-grid', shapes: [
            { formula: 'f(x) = mx + b', name: 'Straight line (linear)', desc: 'Every 1-step increase in x gives the same step in y. Constant, predictable.', used: 'Used in: linear regression' },
            { formula: 'f(x) = x²', name: 'U-shape (parabola)', desc: 'Both −3 and +3 give output 9. Cares about distance from zero, not direction.', used: 'Used in: error / loss functions' },
            { formula: 'f(x) = 1 / (1 + e⁻ˣ)', name: 'S-curve (sigmoid)', desc: 'Squashes any input into a value between 0 and 1. Perfect for probabilities.', used: 'Used in: logistic regression, neural networks' },
            { formula: 'f(x) = max(0, x)', name: 'Flat then sharp (ReLU)', desc: 'Zero for negatives, straight line for positives. Extremely simple — extremely powerful.', used: 'Used in: almost every neural network today' },
          ]},
          { type: 'callout', variant: 'insight', text: '<strong>Function composition:</strong> you can chain functions together — the output of one becomes the input of the next. A neural network with 50 layers is just 50 functions chained together.' },
        ],
      },
      {
        id: 'graphs',
        num: '2.5',
        title: 'Graphs — seeing math instead of reading it',
        content: [
          { type: 'p', text: "Graphs are not a different kind of math. They are just math you can look at. Every graph is a function's input-output table drawn as a picture." },
          { type: 'h3', text: 'The coordinate system' },
          { type: 'p', text: 'Think of a city map. Every location has an address — a street going left-right and an avenue going up-down. On a graph: x-axis goes left-right, y-axis goes up-down. Every point has exactly one address: (x, y).' },
          { type: 'h3', text: 'How to read any graph — the checklist' },
          { type: 'checklist', items: [
            '<strong>What are the axes?</strong> Read labels and units first. A graph without axis labels is meaningless.',
            '<strong>What is the overall trend?</strong> Rising, falling, or flat as x increases?',
            '<strong>Is it linear or curved?</strong> Straight = constant relationship. Curve = changing rate.',
            '<strong>Are there outliers?</strong> Dots far from the rest — error or interesting insight?',
            '<strong>How spread out are the points?</strong> Tight = strong relationship. Loose = weak.',
            '<strong>What question does this raise?</strong> Every pattern is the start of a question.',
          ]},
        ],
      },
      {
        id: 'rates',
        num: '2.6',
        title: 'Rates of change & gradient descent',
        content: [
          { type: 'p', text: 'When something is changing — how fast is it changing? This is the core question, and the answer is the <strong>slope</strong>.' },
          { type: 'h3', text: 'Slope on a straight line' },
          { type: 'p', text: 'In y = mx + b, the letter m is the slope. It tells you how much y changes every time x increases by 1.' },
          { type: 'list', items: [
            { bold: 'm = 2:', text: ' for every 1 step right, y rises 2 steps' },
            { bold: 'm = −3:', text: ' for every 1 step right, y falls 3 steps' },
            { bold: 'm = 0:', text: ' y does not change — flat line, no relationship' },
          ]},
          { type: 'h3', text: 'On a curve, slope changes at every point' },
          { type: 'p', text: 'The slope at one specific point is found by drawing a tangent — a straight line that just barely touches the curve there. This is the core idea of calculus, without needing any calculus notation.' },
          { type: 'h3', text: 'Gradient descent — how machines find the answer' },
          { type: 'p', text: "When a model makes predictions, it makes errors. Plot those errors as a curve — big errors on the sides, small errors at the bottom. The algorithm's job is to find the bottom." },
          { type: 'steps', items: ['Check the slope at the current position', 'Step in the direction that goes downhill', 'Repeat until the slope is zero — you are at the minimum'] },
          { type: 'callout', variant: 'key', text: 'This process is called gradient descent. It is the engine behind almost every ML algorithm ever built — including neural networks. You now understand it from first principles.' },
        ],
      },
    ],
  },
  {
    id: 'bonus',
    num: '★',
    badgeClass: 'ds-badge-amber',
    eyebrow: 'Bonus definition · Preview of Phase 5',
    title: 'Linear regression — the proper definition',
    sections: [
      {
        id: 'linear-regression',
        num: null,
        title: 'Linear regression',
        content: [
          { type: 'h3', text: 'Layer 1 — Plain English' },
          { type: 'callout', variant: 'key', text: 'Linear regression is a method for finding the straight line that best fits a set of data points, and then using that line to make predictions.' },
          { type: 'h3', text: 'Layer 2 — More precise' },
          { type: 'p', text: 'Given a set of observations — each pairing an input (like house size) with an output (like price) — linear regression finds the values of m and b in y = mx + b that make the line pass as close as possible to all the points at once.' },
          { type: 'h3', text: 'Layer 3 — The full definition' },
          { type: 'p', text: 'Linear regression is a supervised machine learning algorithm that models the relationship between one or more input variables and a continuous output variable by fitting a linear equation to the observed data. The best fit is found by minimising the sum of squared differences between the predicted values and the actual observed values. Those differences are called residuals, and the process is called ordinary least squares.' },
          { type: 'h3', text: 'Three things to remember' },
          { type: 'list', items: [
            { bold: 'Supervised:', text: ' you give it labelled examples — inputs paired with known outputs — and it learns from those.' },
            { bold: 'Continuous output:', text: ' it predicts a number, not a category. Price, temperature, weight — not spam/not-spam.' },
            { bold: 'Squared differences:', text: ' squaring penalises big errors harder than small ones. This is the x² function from Section 2.4.' },
          ]},
        ],
      },
    ],
  },
  {
    id: 'key-terms',
    num: '≡',
    badgeClass: 'ds-badge-grey',
    eyebrow: 'Reference · Phase 1 & 2',
    title: 'All key terms',
    sections: [
      {
        id: 'glossary',
        num: null,
        title: 'Glossary',
        content: [
          { type: 'table', rows: [
            ['Data', 'Recorded observations about the world'],
            ['Pattern', 'A repeating structure found across many observations'],
            ['Model', 'A simplified description of reality used to make predictions'],
            ['Training', 'Showing a model many labelled examples so it can learn the pattern'],
            ['Error', 'How far a prediction is from the true answer (predicted − actual)'],
            ['Variable', 'A letter (like x) standing for an unknown number'],
            ['Equation', 'A statement that two expressions are equal. Solving it = finding the unknown.'],
            ['Function f(x)', 'A rule that maps each input to exactly one output'],
            ['Slope (m)', 'Rate of change — how much y changes per 1-unit increase in x'],
            ['Intercept (b)', 'Where the line crosses the y-axis (when x = 0)'],
            ['Tangent', 'A line touching a curve at one point, showing the slope there'],
            ['Gradient descent', 'Algorithm that finds the minimum error by repeatedly stepping downhill'],
            ['Scatter plot', 'A graph where each dot is one observation, showing the relationship between two variables'],
            ['Linear', 'A straight-line relationship between two variables'],
            ['Supervised learning', 'ML where the model learns from labelled examples (input + known output)'],
            ['Residuals', 'The differences between predicted values and actual values in linear regression'],
            ['Sigmoid', 'S-shaped function that squashes any number into 0–1. Used for probabilities.'],
            ['ReLU', 'f(x) = max(0, x). The most widely used function in deep learning.'],
          ]},
          { type: 'callout', variant: 'key', text: 'You now have the foundation. Every future concept — neural networks, deep learning, transformers — is built on exactly what you learned today. Phase 3 (Statistics) is next.' },
        ],
      },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Renderers
// ─────────────────────────────────────────────────────────────────────────────

const CALLOUT_ICONS = { insight: '💡', key: '✓', warning: '⚠', important: '!' };

function renderBlock(block, idx) {
  switch (block.type) {
    case 'p':
      return <p key={idx} className="ds-p" dangerouslySetInnerHTML={{ __html: block.text }} />;

    case 'h3':
      return <h4 key={idx} className="ds-h3">{block.text}</h4>;

    case 'callout':
      return (
        <div key={idx} className={`ds-callout ds-callout-${block.variant}`}>
          <span className="ds-callout-icon">{CALLOUT_ICONS[block.variant]}</span>
          <p dangerouslySetInnerHTML={{ __html: block.text }} />
        </div>
      );

    case 'list':
      return (
        <ul key={idx} className="ds-list">
          {block.items.map((item, i) => (
            <li key={i}>
              {typeof item === 'string'
                ? <span dangerouslySetInnerHTML={{ __html: item }} />
                : item.code
                  ? <><code className="ds-code">{item.code}</code><span dangerouslySetInnerHTML={{ __html: item.text }} /></>
                  : <><strong>{item.bold}</strong><span dangerouslySetInnerHTML={{ __html: item.text }} /></>
              }
            </li>
          ))}
        </ul>
      );

    case 'steps':
      return (
        <ol key={idx} className="ds-steps">
          {block.items.map((item, i) => <li key={i}>{item}</li>)}
        </ol>
      );

    case 'table':
      return (
        <table key={idx} className="ds-table">
          <tbody>
            {block.rows.map(([term, desc], i) => (
              <tr key={i}>
                <td className="ds-table-term">{term}</td>
                <td className="ds-table-desc" dangerouslySetInnerHTML={{ __html: desc }} />
              </tr>
            ))}
          </tbody>
        </table>
      );

    case 'equation':
      return <div key={idx} className="ds-equation">{block.text}</div>;

    case 'shape-grid':
      return (
        <div key={idx} className="ds-shape-grid">
          {block.shapes.map((s, i) => (
            <div key={i} className="ds-shape-card">
              <div className="ds-shape-formula">{s.formula}</div>
              <div className="ds-shape-name">{s.name}</div>
              <div className="ds-shape-desc">{s.desc}</div>
              <div className="ds-shape-used">{s.used}</div>
            </div>
          ))}
        </div>
      );

    case 'checklist':
      return (
        <div key={idx} className="ds-checklist">
          {block.items.map((item, i) => <CheckItem key={i} html={item} />)}
        </div>
      );

    default:
      return null;
  }
}

function CheckItem({ html }) {
  const [checked, setChecked] = useState(false);
  return (
    <label
      className={`ds-check-item ${checked ? 'checked' : ''}`}
      onClick={() => setChecked(c => !c)}
    >
      <input type="checkbox" checked={checked} onChange={() => {}} />
      <span dangerouslySetInnerHTML={{ __html: html }} />
    </label>
  );
}

function SectionBlock({ section }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`ds-section ${open ? 'open' : ''}`}>
      <div className="ds-section-header" onClick={() => setOpen(o => !o)}>
        <div className="ds-section-left">
          {section.num && <span className="ds-section-num">{section.num}</span>}
          <span className="ds-section-title">{section.title}</span>
        </div>
        <span className="chevron">{open ? '▲' : '▼'}</span>
      </div>
      {open && (
        <div className="ds-section-body">
          {section.content.map((block, i) => renderBlock(block, i))}
        </div>
      )}
    </div>
  );
}

function PhaseBlock({ phase }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`ds-phase ${open ? 'open' : ''}`}>
      <div className="ds-phase-header" onClick={() => setOpen(o => !o)}>
        <span className={`ds-phase-badge ${phase.badgeClass}`}>{phase.num}</span>
        <div className="ds-phase-meta">
          <div className="ds-phase-eyebrow">{phase.eyebrow}</div>
          <div className="ds-phase-title">{phase.title}</div>
        </div>
        <span className="chevron">{open ? '▲' : '▼'}</span>
      </div>
      {open && (
        <div className="ds-phase-body">
          {phase.sections.map(section => (
            <SectionBlock key={section.id} section={section} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function DataSciencePage() {
  return (
    <>
      <div className="page-hero">
        <h2 className="page-title">📊 Data Science</h2>
        <p className="page-desc">Study guide — expand a phase, then open sections to explore.</p>
      </div>
      <div className="ds-phases">
        {PHASES.map(phase => (
          <PhaseBlock key={phase.id} phase={phase} />
        ))}
      </div>
    </>
  );
}
