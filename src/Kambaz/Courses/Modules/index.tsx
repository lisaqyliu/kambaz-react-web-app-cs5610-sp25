export default function Modules() {
    // Function for handling Collapse All
    function handleCollapseAll(){
        
    }
    //Function for handling Expand All
    function handleExpandAll(){

    }
    //Function for handling View Progress
    function handleViewProgress(){

    }
    //Function for handling Publish All
    function handlePublishAll(){

    }
    return (
      <div>
        {/* Implement Collapse All button, View Progress button, etc. */}
        <div className="wd-modules-top-menu">
            <button onClick={handleCollapseAll} className="wd-button wd-collapse-all">Collapse All</button>
            <button onClick={handleExpandAll} className="wd-button wd-expand-all">Expand All</button>
            <button onClick={handleViewProgress} className="wd-button wd-view-progress">View Progress</button>
            <button onClick={handlePublishAll} className="wd-button wd-publish-all">Publish All</button>
        </div>
        <ul id="wd-modules">
          <li className="wd-module">
            <div className="wd-title">Week 1, Lecture 1 - Course Introduction, Syllabus, Agenda</div>
            <ul className="wd-lessons">
              <li className="wd-lesson">
                <span className="wd-title">LEARNING OBJECTIVES</span>
                <ul className="wd-content">
                  <li className="wd-content-item">Introduction to the course</li>
                  <li className="wd-content-item">Learn what is Web Development</li>
                </ul>
              </li>
              <li className="wd-lesson">
                <span className="wd-title">READING</span>
                <ul className="wd-content">
                    <li className="wd-content-item">Full Stack Developer - Chapter 1 - Introduction</li>
                    <li className="wd-content-item">Full Stack Developer - Chapter 2 - Ctreate User</li>
                </ul>
              </li>
              <li className="wd-lesson">
                <span className="wd-title">SLIDES</span>
                <ul className="wd-content">
                    <li className="wd-content-item">Introduction to Web Development</li>
                    <li className="wd-content-item">Ctreating an HTTP server with Node.js</li>
                    <li className="wd-content-item">Creating a React Application</li>
                </ul>
              </li>
            </ul>
          </li>
          <li className="wd-module">
            <div className="wd-title">Week 1, Lecture 2 - Formatting User Interfaces with HTML</div>
            <ul className="wd-lessons">
              <li className="wd-lesson">
                <span className="wd-title">LEARNING OBJECTIVES</span>
                <ul className="wd-content">
                    <li className="wd-content-item">Learn how to create user interfaces with HTML</li>
                    <li className="wd-content-item">Deploy the assignment to Netlify</li>
                </ul>
              </li>
              <li className="wd-lesson">
                <span className="wd-title">SLIDES</span>
                <ul className="wd-content">
                    <li className="wd-content-item">Introduction to HTML and the DOM</li>
                    <li className="wd-content-item">Formatting Web content with Headings and </li>
                    <li className="wd-content-item">Formatting content with Lists and Tables</li>
                </ul>
              </li>
            </ul>
          </li>
          <li className="wd-module">
          <div className="wd-title">Week 2</div>
          </li>
        </ul>
      </div>
  );
}