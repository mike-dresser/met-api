const landingImg = [459121, 459122, 459123, 459125, 459126, 459127];

const base_url = `https://collectionapi.metmuseum.org/public/collection/v1/objects/`;

function initalFetch() {
  // landing page Loop of Images

  function pullRando(landingImg) {
    let index = Math.floor(Math.random() * landingImg.length);
    return landingImg[index];
  }

  fetch(`${base_url}${pullRando(landingImg)}`)
    .then((res) => res.json())
    .then((artObj) => {
      console.log(artObj);
      let artDiv = document.querySelector('#mainArt');
      let artImg = document.createElement('img');
      artImg.src = artObj.primaryImage;
      artDiv.append(artImg);
      artDiv.append(createLabel(artObj));
    });
}

function createLabel(artObj) {
  const artLabel = document.createElement('div');
  artLabel.id = 'artLabel';
  let title = document.createElement('h2');
  title.textContent = artObj.title;
  let name = document.createElement('h3');
  name.textContent = artObj.artistDisplayName;
  let artistBio = document.createElement('p');
  artistBio.textContent = artObj.artistDisplayBio;
  artLabel.append(title, name, artistBio);
  return artLabel;
}

function createDepartmentInput() {
  const departments = [
    { departmentId: 1, displayName: 'American Decorative Arts' },
    { departmentId: 3, displayName: 'Ancient Near Eastern Art' },
    { departmentId: 4, displayName: 'Arms and Armor' },
    {
      departmentId: 5,
      displayName: 'Arts of Africa, Oceania, and the Americas',
    },
    { departmentId: 6, displayName: 'Asian Art' },
    { departmentId: 7, displayName: 'The Cloisters' },
    { departmentId: 8, displayName: 'The Costume Institute' },
    { departmentId: 9, displayName: 'Drawings and Prints' },
    { departmentId: 10, displayName: 'Egyptian Art' },
    { departmentId: 11, displayName: 'European Paintings' },
    {
      departmentId: 12,
      displayName: 'European Sculpture and Decorative Arts',
    },
    { departmentId: 13, displayName: 'Greek and Roman Art' },
    { departmentId: 14, displayName: 'Islamic Art' },
    { departmentId: 15, displayName: 'The Robert Lehman Collection' },
    { departmentId: 16, displayName: 'The Libraries' },
    { departmentId: 17, displayName: 'Medieval Art' },
    { departmentId: 18, displayName: 'Musical Instruments' },
    { departmentId: 19, displayName: 'Photographs' },
    { departmentId: 21, displayName: 'Modern Art' },
  ];
  const departmentInput = document.querySelector('#departmentInput');
  departments.forEach((department) => {
    let option = document.createElement('option');
    [option.value, option.textContent] = [
      department.departmentId,
      department.displayName,
    ];
    departmentInput.append(option);
  });
}

function buildSearchForm() {
  createDepartmentInput();
}

initalFetch();
buildSearchForm();
