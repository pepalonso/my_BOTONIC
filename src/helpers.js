
//Function to request data from ofice and fire API
export async function getRandomHouseData() {
  rnd = 0;

  let rnd = (Math.floor(Math.random()*444))+1;
	
  
  const url = `https://anapioficeandfire.com/api/houses/${rnd}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('HTTP error! status: ${response.status}');
    }
    const houseData = await response.json();
    return houseData;
  } catch (error) {
    
    return null;
  }
}


//Function to get image from DALLE API
export async function generateHouseImage(prompt) {
  const apiUrl = 'https://api.openai.com/v1/images/generations';
  const apikey = process.env.REACT_APP_OPENAI_API_KEY;

  const requestData = {
    prompt: prompt,
    model: 'dall-e-3',
    n: 1,
    quality: 'hd',
    response_format: 'url',
    size: '1024x1024',
    style: 'vivid',
  };

  
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apikey}`
      },
      body: JSON.stringify(requestData)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
	
    const responseData = await response.json();
    return responseData.data[0].url;
  
}


//Function to get text from chat GPT 4 
export async function getAIresponse(prompt) {
  const apiUrl = 'https://api.openai.com/v1/chat/completions';
  const apiKey = process.env.REACT_APP_OPENAI_API_KEY;

  const requestBody = {
    model: "gpt-4",
    messages: [
      {role: "system",content: "You are funy assistent, all you jokes are related to Game of trones."
      },
      {
        role: "user",
        content: prompt
      }
    ]
    };

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify(requestBody)
    });

    const data = await response.json();
    const message = data.choices[0].message.content;
    return message;

}

