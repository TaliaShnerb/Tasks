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

# בנה את פרויקט ה-React
RUN npm run build

# השתמש בתמונה קלה יותר לאירוח היישום
FROM nginx:alpine

# העתק את תוצאות הבניית ה-React לתוך תיקיית ה-Nginx
COPY --from=0 /usr/src/app/build /usr/share/nginx/html

# חשוף את הפורט
EXPOSE 80

# הרץ את Nginx
CMD ["nginx", "-g", "daemon off;"]
