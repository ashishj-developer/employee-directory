# Employee Directory 📒

A dynamic employee directory web app using **FreeMarker (Java)** for server-side rendering and **Vanilla JS** for frontend interactivity (filter, sort, and pagination).

---

## 🏗 Project Structure

employee-directory/
├── lib/ # Freemarker JAR
│ └── freemarker-2.3.34.jar
├── src/ # Java source
│ └── Main.java
├── templates/ # FreeMarker templates
│ └── index.ftlh
├── static/
│ ├── css/
│ │ └── style.css
│ └── js/
│ ├── app.js
│ └── data.js
├── output/ # Output HTML from Freemarker
│ └── index.html
└── README.md

yaml
Copy
Edit

---

## ⚙️ Requirements

- Java 17+
- FreeMarker JAR (v2.3.34)

---

## 🚀 How to Run

### 1. Compile Java
```bash
javac -cp "lib/freemarker-2.3.34.jar" -d bin src/Main.java
2. Run the App

java -cp "bin:lib/freemarker-2.3.34.jar" Main
✅ This generates output/index.html using the Freemarker template and embedded employee data.

🖥 View in Browser
Use Live Server or open the file manually:


output/index.html
Tip: Use VS Code's Live Server for automatic refresh.

🧠 Features
Add / Edit Employee (via JS)

Filter by name and department

Sort by name (asc/desc)

Pagination (5 per page)

Responsive layout with vanilla CSS

📦 Data Format
Hardcoded in data.js as mock data:

{
  id: 1,
  firstName: "Ashish",
  lastName: "Raj",
  email: "ashish@example.com",
  department: "Engineering",
  role: "Developer"
}
📄 Template
Uses Freemarker's .ftlh template:

<#list employees as emp>
  <div>${emp.firstName} ${emp.lastName}</div>
</#list>