export default function AssignmentEditor() {
    return (
      <div id="wd-assignments-editor">
        <label htmlFor="wd-name">Assignment Name</label>
        <input id="wd-name" value="A1 - ENV + HTML" /><br /><br />
        <textarea id="wd-description">
          The assignment is available online Submit a link to the landing page of your web application running on Netlify.
        </textarea>
        <br />
        <table>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-points">Points</label>
            </td>
            <td>
              <input id="wd-points" value={100} />
            </td>
          </tr>
          <tr>
            <td align="right" valign="top">
                <label htmlFor="wd-group">Assignment Group</label>
            </td>
            <td>
                <select id="wd-group">
                    <option>Assignments</option>
                </select>
            </td>
          </tr>
          <tr>
            <td align="right" valign="top">
                <label htmlFor="wd-display-grade-as">Display Grade As</label>
            </td>
            <td>
                <select id="wd-display-grade-as">
                    <option>Percentage</option>
                    <option>Points</option>
                </select>
            </td>
          </tr>
          <tr>
            <td align="right" valign="top">
                <label htmlFor="wd-submission-type">Submmision Type</label>
            </td>
            <td>
                <select id="wd-submission-type">
                    <option>Online</option>
                    <option>Text Entry</option>
                    <option>Website URL</option>
                    <option>Media Recordings</option>
                    <option>Student Annotation</option>
                    <option>File Uploads</option>
                </select>
            </td>
          </tr>
          <tr>
            <td align="right" valign="top">
                <label>Online Entry Options</label>
            </td>
            <td>
                <input type="checkbox" id="wd-text-entry" />
                <label htmlFor="wd-text-entry">Text Entry</label> <br />
                <input type="checkbox" id="wd-website-url" />
                <label htmlFor="wd-website-url">Website URL</label> <br />
                <input type="checkbox" id="wd-media-recordings" />
                <label htmlFor="wd-media-recordings">Media Recordings</label> <br />
                <input type="checkbox" id="wd-student-annotation" />
                <label htmlFor="wd-student-annotation">Student Annotation</label> <br />
                <input type="checkbox" id="wd-file-upload" />
                <label htmlFor="wd-file-upload">File Uploads</label> 
            </td>
          </tr>
          <tr>
            <td align="right" valign="top">
                <label htmlFor="wd-assign-to">Assign to</label>
            </td>
            <td>
                <input id="wd-assign-to" value="Everyone" />
            </td>
          </tr>
          <tr>
            <td align="right" valign="top">
                <label htmlFor="wd-due-date">Due</label>
            </td>
            <td>
                <input id="wd-due-date" type="date" value="2024-05-13" />
            </td>
          </tr>
          <tr>
            <td align="right" valign="top">
                <label htmlFor="wd-available-from">Available from</label>
            </td>
            <td>
                <input id="wd-available-from" type="date" value="2024-05-06" />
            </td>
          </tr>
          <tr>
            <td align="right" valign="top">
                <label htmlFor="wd-available-until">Until</label>
            </td>
            <td>
                <input id="wd-available-until" type="date" value="2024-05-20" />
            </td>
          </tr>
        </table>
        <div>
            <button>Cancel</button>
            <button>Save</button>
        </div>
      </div>
  );
}