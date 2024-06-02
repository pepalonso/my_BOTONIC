import React from 'react';
import { getAIresponse } from '../APIrequests.js';
import { Text, RequestContext } from '@botonic/react';

class CarouselofHouses extends React.Component {
  static contextType = RequestContext;

  state = {
    Response: null,
  };

  async componentDidMount() {
    const userMessage = this.context.input.text;
    const Response = await getAIresponse(userMessage);
    this.setState({ Response });
  
  }

  render() {
    const { Response } = this.state;


    return <Text>{Response}</Text>;
  }
}

export default CarouselofHouses;
