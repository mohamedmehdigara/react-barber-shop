//src/components/StyleQuiz.js


import React, {useState, useEffect} from "react";

const StyleQuiz = ({ theme, haircuts }) => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({
    hairType: null,
    style: null,
    length: null,
  });
  const [result, setResult] = useState(null);

  const questions = [
    {
      question: 'What is your hair type?',
      options: [
        { label: 'Straight', key: 'Straight' },
        { label: 'Wavy', key: 'Wavy' },
        { label: 'Curly', key: 'Curly' },
      ],
      answerKey: 'hairType',
    },
    {
      question: 'What\'s your personal style?',
      options: [
        { label: 'Classic', key: 'Classic' },
        { label: 'Trendy', key: 'Trendy' },
        { label: 'Low-Maintenance', key: 'Low-Maintenance' },
      ],
      answerKey: 'style',
    },
    {
      question: 'How long do you want your hair?',
      options: [
        { label: 'Short', key: 'Short' },
        { label: 'Medium', key: 'Medium' },
        { label: 'Long', key: 'Long' },
      ],
      answerKey: 'length',
    },
  ];

  const handleAnswer = (key, value) => {
    setAnswers({ ...answers, [key]: value });
    setStep(step + 1);
  };

  useEffect(() => {
    if (step >= questions.length) {
      // Logic to determine the result based on answers
      let recommendedHaircut = null;
      if (answers.hairType === 'Wavy' && answers.style === 'Classic' && answers.length === 'Short') {
        recommendedHaircut = haircuts.find(h => h.name === 'Crew Cut');
      } else if (answers.hairType === 'Straight' && answers.style === 'Trendy' && answers.length === 'Medium') {
        recommendedHaircut = haircuts.find(h => h.name === 'Undercut');
      } else {
        recommendedHaircut = haircuts.find(h => h.name === 'Classic Fade');
      }
      setResult(recommendedHaircut);
    }
  }, [step, answers, haircuts, questions.length]);

  const resetQuiz = () => {
    setStep(0);
    setAnswers({ hairType: null, style: null, length: null });
    setResult(null);
  };
}
export default StyleQuiz;