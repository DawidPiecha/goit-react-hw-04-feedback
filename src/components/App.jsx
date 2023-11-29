import { useState } from 'react';
import { Section } from './Section/Section';
import { FeedbackOptions } from './FeedbackOptions/FeedbackOptions';
import { Notification } from './Notification/Notification';
import { Statistics } from './Statistics/Statistics';

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  //tej funkcji użyłem do obsługi kliknięcia w poszczególne przyciski : good / neutral / bad
  const handleFeedback = event => {
    const rating = event.target.name; //lub const { name } = event.target; określąjące bezpośrednio atrybut name przycisku
    const step = 1;

    if (rating === 'good') {
      setGood(good + step);
    } else if (rating === 'neutral') {
      setNeutral(neutral + step);
    } else if (rating === 'bad') {
      setBad(bad + step);
    }
  };

  //tej funkcji użyłem do obliczenia całkowitej liczby kliknięć w przyciski
  const countTotalFeedback = () => {
    return good + neutral + bad;
  };

  //tej funkcji użyłem do obliczenia udziału procentowego pozytywnych opinii (udziału kliknięć w przycisk good). Math.floor zaokrąla procent w dół.
  const countPositiveFeedbackPercentage = () => {
    const totalFeedback = countTotalFeedback();
    const positivePercentage = Math.floor((good / totalFeedback) * 100);
    return positivePercentage;
  };

  const total = countTotalFeedback();
  const positivePercentage = countPositiveFeedbackPercentage();

  return (
    <div className="app-container">
      <Section title="Please leave feedback">
        <FeedbackOptions
          options={['good', 'neutral', 'bad']}
          onLeaveFeedback={handleFeedback}
        />
      </Section>
      <Section title="Statistics">
        {total === 0 ? (
          <Notification message="There is no feedback"></Notification>
        ) : (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={total}
            positivePercentage={positivePercentage}
          />
        )}
      </Section>
    </div>
  );
};

export { App };
