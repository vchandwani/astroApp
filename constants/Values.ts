export const ARIES = 'aries';
export const AQUARIUS = 'aquarius';
export const CANCER = 'cancer';
export const CAPRICORN = 'capricorn';
export const GEMINI = 'gemini';
export const LEO = 'leo';
export const LIBRA = 'libra';
export const PISCES = 'pisces';
export const SAGITTARIUS = 'sagittarius';
export const SCORPIO = 'scorpio';
export const TAURUS = 'taurus';
export const VIRGO = 'virgo';

export const DIAMOND ='Diamond'
export const EMERALD ='Emerald'
export const PEARL ='Pearl'
export const RUBY ='Ruby'
export const PERIDOT ='Peridot'
export const BLUE_SAPPHIRE ='Blue Sapphire'
export const OPAL ='Opal'
export const TOPAZ ='Topaz'
export const TURQUOISE ='Turquoise'
export const GARNET ='Garnet'
export const AMETHYST ='Amethyst'
export const AQUAMARINE ='Aquamarine'

export const PLANETS ='Planets'
export const DAILY= 'daily'
export const MONTHLY= 'monthly'
export const YEARLY = 'yearly'

export type PredictionType = typeof DAILY | typeof MONTHLY | typeof YEARLY;
export const DATE_FORMAT_DDMMYYY = 'DD-MM-YYYY';
export const DATE_FORMAT_APICALL = 'MMM Do YYYY';

export const YOUR_NAME='Your Name'
export const NAME='Name'
export const DATE_OF_BIRTH ='Date of Birth'
export const DATE_OF_BIRTH_PLACEHOLDER ='e.g., 15-01-1990'
export const TIME_OF_BIRTH ='Time of Birth'
export const TIME_OF_BIRTH_PLACEHOLDER ='e.g., 14:30'
export const GET_PREDICTION ='Get Prediction'
export const YOUR_SUN_SIGN ='Your Sun Sign is:'
export const YOUR_LUCKY_GEMSTONE ='Your lucky Gemstone'

export const DAILY_PREDICTION_PROMPT = ` 
    **Today** - Include insight about career, learning and personal emotion.
    **Best Suited Colour(s)** - Include insight about the colours for the day and its significance in a single paragraph.
    **Best Suited Number(s)** - Include insight about the numbers for the day and its significance in a single paragraph.
    **Summary** - Conclude with a positive affirmation or advice that encourages the user to embrace their unique astrological influences and treat astrology only as guide in a single paragraph.
`;

export const MONTHLY_PREDICTION_PROMPT = ` 
    **Aspect** - Begin with a brief introduction that explains the significance of astrology and how the user's birth details will influence their astrological reading.
    **Sun Sign Characterstic** - Provide a summary of the user's sun sign, moon sign, and rising sign (ascendant), along with a brief explanation of each sign's characteristics with proper names and segregation.
    **Best Suited Colour(s)** - Include a very brief insight about the colours best suited for the month and its significance in a single paragraph.
    **Best Suited Number(s)** - Include a very brief insight about the numbers for the month and its significance in a single paragraph.
    **Best Day(s)** - Include a very brief insight about the name of best days for the month and its significance in a single paragraph.
    **Planets** - Offer insights into the positions of the planets at the time of birth, focusing on key aspects that may influence the user's life path, personality, and relationships with proper names and segregation.
    **Astrological Influence** - Discuss any notable astrological events (e.g., retrogrades, eclipses) occurring around the user's date of birth and their potential impact in a single paragraph.
    **Personalized Predictions** - Include detailed personalized predictions or guidance based on the user's astrological chart, touching upon areas such as career, love life, and personal growth in a single paragraph.
    **Summary** - Conclude with a positive affirmation or advice that encourages the user to embrace their unique astrological influences and treat astrology only as guide in a single paragraph.
`

export const YEARLY_PREDICTION_PROMPT = ` 
    **Aspect** - Begin with a brief introduction that explains the significance of astrology and how the user's birth details will influence their astrological reading.
    **Sun Sign Characterstic** - Provide a summary of the user's sun sign, moon sign, and rising sign (ascendant), along with a brief explanation of each sign's characteristics with proper names and segregation.
    **Best Suited Colour(s)** - Include insight about the colours best suited for the year and its significance in a single paragraph.
    **Best Suited Number(s)** - Include insight about the numbers for the year and its significance in a single paragraph.
    **Best Months(s)** - Include insight about the best months for the year and its significance in a single paragraph.
    **Planets** - Offer insights into the positions of the planets at the time of birth, focusing on key aspects that may influence the user's life path, personality, and relationships with proper names and segregation.
    **Astrological Influence** - Discuss any notable astrological events (e.g., retrogrades, eclipses) occurring around the user's date of birth and their potential impact in a single paragraph.
    **Personalized Predictions** - Include detailed personalized predictions or guidance based on the user's astrological chart, touching upon areas such as career, love life, and personal growth in a single paragraph.
    **Summary** - Conclude with a positive affirmation or advice that encourages the user to embrace their unique astrological influences and treat astrology only as guide in a single paragraph.
`