'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Songs', [
      {
        title: 'Umbrella',
        description: 'This is a song by Barbadian singer Rihanna. It features American rapper Jay-Z.',
        albumId: 2,
        artistId: 3,
        url: 'www.unbrella.song',
        previewImage: 'https://upload.wikimedia.org/wikipedia/en/f/f7/Good_Girl_Gone_Bad.png',
      },
      {
        title: 'Empire State of Mind',
        description: 'This is a song performed by American rapper Jay-Z featuring vocals by American singer Alicia Keys',
        albumId: 1,
        artistId: 1,
        url: 'www.empire.state.of.mind',
        previewImage: 'https://upload.wikimedia.org/wikipedia/en/thumb/b/ba/Empire_State_of_Mind_single_cover.jpg/220px-Empire_State_of_Mind_single_cover.jpg'
      },
      {
        title: 'Izzo (H.O.V.A.)',
        description: 'This song is often referred to as "H to the Izzo" is the first single released by Jay-Z from his sixth album The Blueprint. It is among his most popular singles.',
        albumId: 1,
        artistId: 1,
        url: 'www.encore.song',
        previewImage: 'https://upload.wikimedia.org/wikipedia/en/thumb/b/ba/Empire_State_of_Mind_single_cover.jpg/220px-Empire_State_of_Mind_single_cover.jpg'
      },
      {
        title: 'No One',
        description: 'This is a song by American singer Alicia Keys from her third studio album, As I Am (2007).',
        albumId: 3,
        artistId: 4,
        url: 'www.no.one',
        previewImage: 'https://upload.wikimedia.org/wikipedia/en/0/0a/Alicia_Keys_-_As_I_Am.png'
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Songs', null, {});
  }
};
