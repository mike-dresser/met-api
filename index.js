const base_url =
  'https://collectionapi.metmuseum.org/public/collection/v1/objects/459123';

function initalFetch() {
  fetch(base_url)
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

initalFetch();

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
