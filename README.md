# 🎥 Movie Search Project  

Welcome to my first project on GitHub! This is a simple **Movie Search Application** that allows users to search for movies and view their details using data fetched from an API.  

---

## 🚀 Features  

- **Search for movies** by title and release year.  
- View detailed information about each movie, including:  
  - Title  
  - Release Year  
  - Release Date  
  - Runtime  
  - Box Office Collection  
  - Poster Image  
- Provides a download link for torrents on 1337x.  
- User-friendly and dynamic HTML rendering.  
- Error handling for invalid inputs and API errors.  

---

## 🛠️ Tech Stack  

- **Backend**: Node.js, Express.js  
- **API Integration**: OMDB API  
- **Frontend**: HTML, CSS (inline styling for dynamic pages)  
- **Middleware**: Body-Parser for parsing form data  
- **Modules**: `https` for making API requests  
 

---

## 🌟 What I Learned  

- Setting up a backend server using Express.js.  
- Fetching data from external APIs using the `https` module.  
- Dynamically rendering HTML based on API responses.  
- Handling asynchronous operations with callbacks and Promises.  
- Implementing basic error handling for better user experience.  
- Structuring and uploading projects to GitHub.  

---

## 📂 How to Run Locally  

1. Clone this repository:  
   ```bash
   git clone https://github.com/<your-username>/movie-search-project.git
   cd movie-search-project
   ```

2. Install dependencies:  
   ```bash
   npm install express body-parser
   ```

3. Set up the OMDB API key:  
   - Obtain an API key from [OMDB API](https://www.omdbapi.com/apikey.aspx).  
   - Replace the placeholder `3852891` in the code with your API key.  

4. Run the server:  
   ```bash
   node app.js
   ```
   The server will run on `http://localhost:3000` by default.  

5. Open your browser and navigate to `http://localhost:3000`.  

6. Enter a movie title and release year in the form, then click **Search**.  

---

## 🌐 Example Output  
- **Input**: Movie: "Inception", Year: "2010"  
- **Output**: Displays release date, runtime, box office details, poster, and a download link.  

---

## 🎉 Live Demo  
If hosted, include a live demo link here:  
```markdown
[Live Demo](https://your-github-username.github.io/movie-search-project/)
```

---

## 📁 File Structure  
```
movie-search-project/
├── app.js        # Main server-side code
├── index.html    # Frontend form for movie search
├── package.json  # Project dependencies
└── README.md     # Project documentation
```

---

## 🤝 Contributing  
Contributions are welcome! If you have suggestions or want to improve this project, feel free to:  
- Fork the repository  
- Create a new branch  
- Submit a pull request  

---


## 💌 Feedback  
If you have any questions or feedback, please open an issue or reach out to me at [abhishek.tyagi9166@gmail.com].

