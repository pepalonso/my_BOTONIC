import React from 'react';
import {getRandomHouseData, generateHouseImage} from '../APIrequests.js';
import {
  Text,
  Button,
  Carousel,
  Pic,
  Element,
  Title,
  Subtitle,
} from '@botonic/react';



class CarouselofHouses extends React.Component {
  constructor(props) {
    super(props);
   
    // Define the 3 houses we'll be working with
    this.state = {
      houses: [],
      error: null, 
    };
  }

  async componentDidMount() {
    try {
      //Get the data nd the image from the ice and fire and DALLE3 API
      const houses = await this.getHouseData(3);
      this.setState({ houses });
    } catch (error) {
      this.setState({ error: error.message });
    }
  }
  
  
  async getHouseData(num) {
    const houses = [];
    const images = [];
    const names = new Set();
    // Get houses utill we have 3 with coat of arms
    while (houses.length < num) {
      const houseData = await getRandomHouseData();
      if (houseData && houseData.coatOfArms && !names.has(houseData.name)) {
        houses.push(houseData);
        names.add(houseData.name);
      }
    }

    for (const house of houses) {
      const image = await generateHouseImage(`${house.coatOfArms}`);
      images.push(image);
    }

    return houses.map((house, i) => ({
      name: house.name,
      coatOfArms: house.coatOfArms,
      pic: images[i],
    }));
  }

    	
  render() {
    const { houses, error } = this.state;

    if (error) {
      return <Text>Error: {error}</Text>;
    }
	//Wait for a response
    if (houses.lenght < 3) {
      return <Text>Loading...</Text>;
    }

    return (
      <>
        <Text>Hello! Choose a House:</Text>
        <Carousel>
          {houses.map((house, i) => (
            <Element key={i}>
              <Pic src={house.pic} />
              <Title>{house.name}</Title>
              <Button payload={`showCoatOfArms?coatOfArms=${encodeURIComponent(house.coatOfArms)}`}>
                Show Coat of Arms
	      </Button>
            </Element>
          ))}
        </Carousel>
        
      </>
    );
  }
}

export default CarouselofHouses;
