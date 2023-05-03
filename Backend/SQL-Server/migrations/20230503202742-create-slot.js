'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Slots', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      SlotID: {
        type: Sequelize.STRING
      },
      PetID: {
        type: Sequelize.STRING
      },
      DoctorID: {
        type: Sequelize.STRING
      },
      CurrentStatus: {
        type: Sequelize.STRING
      },
      CustomerID: {
        type: Sequelize.STRING
      },
      MedicalHistoryStatus: {
        type: Sequelize.BOOLEAN
      },
      DoctorSummary: {
        type: Sequelize.STRING
      },
      CustomerSummary: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Slots');
  }
};