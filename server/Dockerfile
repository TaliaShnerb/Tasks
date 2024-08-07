# בחר את התמונה הבסיסית המתאימה
FROM node:18

# הגדר את תיקיית העבודה בתוך הקונטיינר
WORKDIR /usr/src/app

# העתק את קבצי package.json ו-package-lock.json כדי להתקין תלותים
COPY package*.json ./

# התקן את התלויות
RUN npm install

# העתק את שאר הקבצים לתוך הקונטיינר
COPY . .

# הכן את השרת להאזנה על פורט מסוים (נניח 5000)
EXPOSE 5000

# הרץ את השרת
CMD ["node", "server.js"]
