import React, { Component } from 'react';
import { Section } from './Section/Section';
import { FeedbackOptions } from './FeedbackOptions/FeedbackOptions';
import { Notification } from './Notification/Notification';
import { Statistics } from './Statistics/Statistics';

class App extends Component {
  state = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  //tej funkcji użyłem do obsługi kliknięcia w poszczególne przyciski : good / neutral / bad
  handleFeedback = event => {
    const rating = event.target.name;
    const step = 1;
    this.setState(prevState => ({ [rating]: prevState[rating] + step }));
  };

  //tej funkcji użyłem do obliczenia całkowitej liczby kliknięć w przyciski
  countTotalFeedback = () => {
    const { good, neutral, bad } = this.state;
    return good + neutral + bad;
  };

  //tej funkcji użyłem do obliczenia udziału procentowego pozytywnych opinii (udziału kliknięć w przycisk good). Math.floor zaokrąla procent w dół.
  countPositiveFeedbackPercentage = () => {
    const totalFeedback = this.countTotalFeedback();
    const positivePercentage = Math.floor(
      (this.state.good / totalFeedback) * 100
    );
    return positivePercentage;
  };

  render() {
    const { good, neutral, bad } = this.state;
    const total = this.countTotalFeedback();
    const positivePercentage = this.countPositiveFeedbackPercentage();

    return (
      <div className="app-container">
        <Section title="Please leave feedback">
          <FeedbackOptions
            options={Object.keys(this.state)}
            onLeaveFeedback={this.handleFeedback}
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
  }
}

export { App };
