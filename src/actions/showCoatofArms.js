import React from 'react';
import { Text, RequestContext } from '@botonic/react';

export default class ShowCoatOfArms extends React.Component {
  static contextType = RequestContext;

  render() {
    const coatOfArms = decodeURIComponent(this.context.input.payload.match(/\?coatOfArms=(.*)/)[1]);

    return (
      <Text>
        {coatOfArms}
      </Text>
    );
  }
}
