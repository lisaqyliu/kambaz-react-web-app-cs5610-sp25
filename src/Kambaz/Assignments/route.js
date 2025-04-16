app.get("/api/modules/:moduleId/assignments", async (req, res) => {
  try {
    const { moduleId } = req.params;
    const assignments = await dao.findAssignmentsForModule(moduleId);
    console.log("Raw assignments from DB:", assignments);
    
    // Ensure each assignment has an ID
    const processedAssignments = assignments.map(assignment => {
      const assignmentObj = assignment.toObject ? assignment.toObject() : assignment;
      console.log("Processing single assignment:", assignmentObj);
      
      // If no _id exists, generate one based on module
      if (!assignmentObj._id) {
        assignmentObj._id = `A${moduleId.substring(1)}${Math.floor(Math.random() * 900) + 100}`;
        console.log("Generated ID for assignment:", assignmentObj._id);
      }
      
      return assignmentObj;
    });
    
    console.log("Final processed assignments:", processedAssignments);
    res.json(processedAssignments);
  } catch (err) {
    console.error("Error fetching assignments:", err);
    res.status(500).send({ error: "Failed to fetch assignments" });
  }
}); 