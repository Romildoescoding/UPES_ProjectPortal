// Import Sequelize and define database connection
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('secrets', 'postgres', 'Tanihq@0512', {
  dialect: 'postgres', // Change this to your database dialect
  host: 'localhost',
  port: 5432 // Change this to your database port
});

// Define Sequelize models
const ActivityCoordinator = sequelize.define('ActivityCoordinator', {
  activitycoordinator_id: {
    type: DataTypes.STRING(15),
    primaryKey: true
  },
  activitycoordinator_name: {
    type: DataTypes.STRING(20)
  },
  passwords: {
    type: DataTypes.STRING(20)
  }
});

const Students = sequelize.define('Students', {
  students_id: {
    type: DataTypes.STRING(15),
    primaryKey: true
  },
  student_name: {
    type: DataTypes.STRING(15)
  },
  passwords: {
    type: DataTypes.STRING(15)
  },
  project_id: {
    type: DataTypes.STRING(10),
    unique: true
  },
  assigned_faculty: {
    type: DataTypes.JSONB
  },
  report: {
    type: DataTypes.TEXT
  }
});

const GroupAssigned = sequelize.define('GroupAssigned', {
  group_name: {
    type: DataTypes.STRING(50)
  }
});

const ProjectPresentation = sequelize.define('ProjectPresentation', {
  marks: {
    type: DataTypes.INTEGER
  },
  presentation_date: {
    type: DataTypes.DATE
  }
});

const Faculty = sequelize.define('Faculty', {
  faculty_id: {
    type: DataTypes.STRING(15),
    primaryKey: true
  },
  faculty_name: {
    type: DataTypes.STRING(15)
  },
  faculty_password: {
    type: DataTypes.STRING(15)
  }
});

// Define associations between models
ActivityCoordinator.hasMany(GroupAssigned, { foreignKey: 'activitycoordinator_id' });
Students.hasMany(GroupAssigned, { foreignKey: 'student_id' });
Faculty.hasMany(ProjectPresentation, { foreignKey: 'faculty_id' });
Students.hasMany(ProjectPresentation, { foreignKey: 'student_id' });

// Sync models with database
sequelize.sync({ force: true }) // Set force: true to drop existing tables
  .then(() => {
    console.log('All tables synced successfully');

    // CRUD operations for ActivityCoordinator
    ActivityCoordinator.create({
      activitycoordinator_id: 'AC001',
      activitycoordinator_name: 'John Doe',
      passwords: 'password123'
    }).then(activityCoordinator => {
      console.log('Activity Coordinator created:', activityCoordinator.toJSON());
    }).catch(error => {
      console.error('Error creating Activity Coordinator:', error);
    });

    ActivityCoordinator.findAll().then(activityCoordinators => {
      console.log('All Activity Coordinators:', activityCoordinators.map(ac => ac.toJSON()));
    }).catch(error => {
      console.error('Error fetching Activity Coordinators:', error);
    });

    ActivityCoordinator.update({ activitycoordinator_name: 'Jane Doe' }, {
      where: { activitycoordinator_id: 'AC001' }
    }).then(rowsUpdated => {
      console.log('Rows updated:', rowsUpdated);
    }).catch(error => {
      console.error('Error updating Activity Coordinator:', error);
    });

    ActivityCoordinator.destroy({
      where: { activitycoordinator_id: 'AC001' }
    }).then(rowsDeleted => {
      console.log('Rows deleted:', rowsDeleted);
    }).catch(error => {
      console.error('Error deleting Activity Coordinator:', error);
    });

    // CRUD operations for Students
    Students.create({
      students_id: 'S001',
      student_name: 'Alice',
      passwords: 'password123',
      project_id: 'P001',
      assigned_faculty: { faculty_id: 'F001', faculty_name: 'John' },
      report: 'This is a sample report.'
    }).then(student => {
      console.log('Student created:', student.toJSON());
    }).catch(error => {
      console.error('Error creating Student:', error);
    });

    Students.findAll().then(students => {
      console.log('All Students:', students.map(student => student.toJSON()));
    }).catch(error => {
      console.error('Error fetching Students:', error);
    });

    Students.update({ student_name: 'Alice Smith' }, {
      where: { students_id: 'S001' }
    }).then(rowsUpdated => {
      console.log('Rows updated:', rowsUpdated);
    }).catch(error => {
      console.error('Error updating Student:', error);
    });

    Students.destroy({
      where: { students_id: 'S001' }
    }).then(rowsDeleted => {
      console.log('Rows deleted:', rowsDeleted);
    }).catch(error => {
      console.error('Error deleting Student:', error);
    });

    // CRUD operations for GroupAssigned
    GroupAssigned.create({
      group_name: 'Group A'
    }).then(group => {
      console.log('Group assigned created:', group.toJSON());
    }).catch(error => {
      console.error('Error creating Group assigned:', error);
    });

    GroupAssigned.findAll().then(groups => {
      console.log('All Groups assigned:', groups.map(group => group.toJSON()));
    }).catch(error => {
      console.error('Error fetching Groups assigned:', error);
    });

    GroupAssigned.update({ group_name: 'Group B' }, {
      where: { id: 1 } // Assuming you want to update the group with id 1
    }).then(rowsUpdated => {
      console.log('Rows updated:', rowsUpdated);
    }).catch(error => {
      console.error('Error updating Group assigned:', error);
    });

    GroupAssigned.destroy({
      where: { id: 1 } // Assuming you want to delete the group with id 1
    }).then(rowsDeleted => {
      console.log('Rows deleted:', rowsDeleted);
    }).catch(error => {
      console.error('Error deleting Group assigned:', error);
    });

    // CRUD operations for ProjectPresentation
    ProjectPresentation.create({
      marks: 85,
      presentation_date: new Date('2024-04-01')
    }).then(presentation => {
      console.log('Project presentation created:', presentation.toJSON());
    }).catch(error => {
      console.error('Error creating Project presentation:', error);
    });

    ProjectPresentation.findAll().then(presentations => {
      console.log('All Project presentations:', presentations.map(presentation => presentation.toJSON()));
    }).catch(error => {
      console.error('Error fetching Project presentations:', error);
    });

    ProjectPresentation.update({ marks: 90 }, {
      where: { id: 1 } // Assuming you want to update the presentation with id 1
    }).then(rowsUpdated => {
      console.log('Rows updated:', rowsUpdated);
    }).catch(error => {
      console.error('Error updating Project presentation:', error);
    });

    ProjectPresentation.destroy({
      where: { id: 1 } // Assuming you want to delete the presentation with id 1
    }).then(rowsDeleted => {
      console.log('Rows deleted:', rowsDeleted);
    }).catch(error => {
      console.error('Error deleting Project presentation:', error);
    });

    // CRUD operations for Faculty
    Faculty.create({
      faculty_id: 'F001',
      faculty_name: 'John',
      faculty_id: 'F001',
      faculty_name: 'John Doe',
      faculty_password: 'password123'
    }).then(faculty => {
      console.log('Faculty created:', faculty.toJSON());
    }).catch(error => {
      console.error('Error creating Faculty:', error);
    });

    Faculty.findAll().then(faculties => {
      console.log('All Faculties:', faculties.map(faculty => faculty.toJSON()));
    }).catch(error => {
      console.error('Error fetching Faculties:', error);
    });

    Faculty.update({ faculty_name: 'Jane Doe' }, {
      where: { faculty_id: 'F001' }
    }).then(rowsUpdated => {
      console.log('Rows updated:', rowsUpdated);
    }).catch(error => {
      console.error('Error updating Faculty:', error);
    });

    Faculty.destroy({
      where: { faculty_id: 'F001' }
    }).then(rowsDeleted => {
      console.log('Rows deleted:', rowsDeleted);
    }).catch(error => {
      console.error('Error deleting Faculty:', error);
    });
  })
  .catch(err => {
    console.error('Error syncing tables:', err);
  });

