import React from 'react'
import { Text, Reply } from '@botonic/react'
import Carousel from './actions/carousel'
import ShowCoatOfArms from './actions/showCoatofArms';
import OpenAIresponse from './actions/AIresponse';


export function routes({ input, session, params, lastRoutePath }) {
    //Acces a session variable to be able to send a firts-time action
    if (session.name != 'not firts'){
    	session.name = 'not firts';
    	return[{
        path: 'carousel',
        text: /.*/,
        action: Carousel,
        childRoutes: [
          { 
            // we make use of a payload to print the coat of arms after the user hits the button
            path: 'showCoatOfArms', 
            payload: /^showCoatOfArms(\?coatOfArms=.*)?$/, 
            action: ShowCoatOfArms 
          }
        ]
      }];
    }

    else {

    return [
      {
        path: 'openaiChat',
        text: /.*/,
        action: OpenAIresponse,
      }
    ];
  }
  
}



