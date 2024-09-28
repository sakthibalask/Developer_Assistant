/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'blueColor':'#64bcf4',
        'greyIsh':'#f1f4f8',
        'grey':'#aaa',
        'cardShadow':'#f7f8f9',
        'textColor':'#121212',
        'danger':'#D32f2f',
        'White': '#ffffff',
        'success': '#388e3c',
        'lightSucess':'#BBF7D0',
        'dark':'#000000',
        'lightmainColor':'#CFE8FF',
        'light':'#f6f6f9',
        'dark-one':'#312f3a',
        'lightdanger':'#FEC0D3',
        'lightdark':'#363949',
        'dark1':'#000000',
        'dark2':'#4D4D4D',
        'darklight1': '#979797',
        'darklight2': '#1E1E1E'
      },
      backgroundImage: {
        'card-image':"url('UI_client/ProInterns/src/assets/Images/card.jpeg')"
      }
    },
  },
  plugins: [],
}

