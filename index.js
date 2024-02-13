const base_url = `https://collectionapi.metmuseum.org/public/collection/v1/objects/`;
const search_url = `https://collectionapi.metmuseum.org/public/collection/v1/search`;

function initialFetch() {
  // Previous set -- [459121, 459122, 459123, 459125, 459126, 459127];
  // Current landing images are highlights from the European Painting dept
  const landingImg = [
    437372, 437749, 437879, 436966, 437869, 437394, 436545, 436253, 437769,
    437326, 437790, 437423, 435728, 435853, 436516, 437127, 437891, 435868,
    437675, 438112, 435888, 435984, 436792, 435802, 438818, 436095, 436504,
    437926, 436173, 436947, 437430, 436101, 437658, 438822, 436121, 437455,
    437487, 436002, 437329, 437826, 435896, 436658, 437971, 436839, 436896,
    436532, 436892, 437490, 437609, 634108, 435641, 438817, 437133, 435882,
    438814, 435876, 827660, 436603, 436282, 437835, 679844, 435739, 436819,
    437175, 436838, 436528, 437854, 435621, 435851, 436944, 435809, 435600,
    435844, 437900, 436575, 436573, 435702, 436440, 436579, 438417, 437447,
    437097, 436323, 436851, 438821, 435817, 437654, 438816, 436105, 435908,
    437283, 437153, 436037, 437056, 437344, 436964, 437881, 436535, 435826,
    437299, 438820, 437053, 438815, 437549, 436918, 435962, 436622, 436840,
    437532, 439933, 436106, 815112, 437397, 435839, 437261, 441769, 438605,
    440723, 626692, 438754, 436244,
  ];
  // Clear contents if reloading random image
  let artDiv = document.querySelector('#mainArt');
  artDiv.innerHTML = '';
  // Clear contents if coming from search results
  const clearCont = document.querySelector('#thumbnailGrid');
  clearCont.style.display = 'none';
  artDiv.style.display = 'flex';

  function pullRando(landingImg) {
    let index = Math.floor(Math.random() * landingImg.length);
    return landingImg[index];
  }

  fetch(`${base_url}${pullRando(landingImg)}`)
    .then((res) => res.json())
    .then((artObj) => {
      let artFrame = document.createElement('div');
      artFrame.className = 'frame';
      let artImg = document.createElement('img');
      artImg.src = artObj.primaryImage;
      artFrame.append(artImg);
      artDiv.append(artFrame);
      makeLikable(artFrame);
      artDiv.append(createLabel(artObj));
    });
}

function makeLikable(container) {
  let heart = document.createElement('span');
  heart.textContent = '♥︎';
  heart.className = 'likeBtn';
  let x = document.createElement('span');
  x.textContent = `⨉`;
  x.className = 'closeBtn';
  container.append(x, heart);
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

function createSelectBox(data, valueKey, displayKey, element) {
  //accepts an array of objects, the key names for 'value' and 'display' within
  //those objects (if they are different), and a targeted select element, to create
  // and append selectbox options for each item

  data.forEach((item) => {
    let option = document.createElement('option');
    [option.value, option.textContent] = [item[valueKey], item[displayKey]];
    element.append(option);
  });
}

function buildSearchForm() {
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
  const countries = [
    { name: 'Afghanistan', code: 'AF' },
    { name: 'Albania', code: 'AL' },
    { name: 'Algeria', code: 'DZ' },
    { name: 'Angola', code: 'AO' },
    { name: 'Argentina', code: 'AR' },
    { name: 'Armenia', code: 'AM' },
    { name: 'Australia', code: 'AU' },
    { name: 'Austria', code: 'AT' },
    { name: 'Azerbaijan', code: 'AZ' },
    { name: 'Bahrain', code: 'BH' },
    { name: 'Bangladesh', code: 'BD' },
    { name: 'Belgium', code: 'BE' },
    { name: 'Benin', code: 'BJ' },
    { name: 'Bhutan', code: 'BT' },
    { name: 'Bolivia', code: 'BO' },
    { name: 'Bosnia', code: 'BA' },
    { name: 'Botswana', code: 'BW' },
    { name: 'Brazil', code: 'BR' },
    { name: 'Brunei', code: 'BN' },
    { name: 'Bulgaria', code: 'BG' },
    { name: 'Burkina Faso', code: 'BF' },
    { name: 'Burundi', code: 'BI' },
    { name: 'Cambodia', code: 'KH' },
    { name: 'Cameroon', code: 'CM' },
    { name: 'Canada', code: 'CA' },
    { name: 'Chad', code: 'TD' },
    { name: 'Chile', code: 'CL' },
    { name: 'China', code: 'CN' },
    { name: 'Colombia', code: 'CO' },
    { name: 'Congo', code: 'CG' },
    { name: 'Costa Rica', code: 'CR' },
    { name: 'Croatia', code: 'HR' },
    { name: 'Cuba', code: 'CU' },
    { name: 'Cyprus', code: 'CY' },
    { name: 'Czech Republic', code: 'CZ' },
    { name: 'Denmark', code: 'DK' },
    { name: 'Djibouti', code: 'DJ' },
    { name: 'Dominica', code: 'DM' },
    { name: 'Dominican Republic', code: 'DO' },
    { name: 'Ecuador', code: 'EC' },
    { name: 'Egypt', code: 'EG' },
    { name: 'El Salvador', code: 'SV' },
    { name: 'Equatorial Guinea', code: 'GQ' },
    { name: 'Eritrea', code: 'ER' },
    { name: 'Estonia', code: 'EE' },
    { name: 'Ethiopia', code: 'ET' },
    { name: 'Falkland Islands', code: 'FK' },
    { name: 'Fiji', code: 'FJ' },
    { name: 'Finland', code: 'FI' },
    { name: 'France', code: 'FR' },
    { name: 'French Polynesia', code: 'PF' },
    { name: 'Gabon', code: 'GA' },
    { name: 'Gambia', code: 'GM' },
    { name: 'Georgia', code: 'GE' },
    { name: 'Germany', code: 'DE' },
    { name: 'Ghana', code: 'GH' },
    { name: 'Gibraltar', code: 'GI' },
    { name: 'Greece', code: 'GR' },
    { name: 'Greenland', code: 'GL' },
    { name: 'Grenada', code: 'GD' },
    { name: 'Guadeloupe', code: 'GP' },
    { name: 'Guam', code: 'GU' },
    { name: 'Guatemala', code: 'GT' },
    { name: 'Guernsey', code: 'GG' },
    { name: 'Guinea', code: 'GN' },
    { name: 'Guinea-Bissau', code: 'GW' },
    { name: 'Guyana', code: 'GY' },
    { name: 'Haiti', code: 'HT' },
    { name: 'Honduras', code: 'HN' },
    { name: 'Hong Kong', code: 'HK' },
    { name: 'Hungary', code: 'HU' },
    { name: 'Iceland', code: 'IS' },
    { name: 'India', code: 'IN' },
    { name: 'Indonesia', code: 'ID' },
    { name: 'Iran', code: 'IR' },
    { name: 'Iraq', code: 'IQ' },
    { name: 'Ireland', code: 'IE' },
    { name: 'Isle of Man', code: 'IM' },
    { name: 'Israel', code: 'IL' },
    { name: 'Italy', code: 'IT' },
    { name: 'Jamaica', code: 'JM' },
    { name: 'Japan', code: 'JP' },
    { name: 'Jersey', code: 'JE' },
    { name: 'Jordan', code: 'JO' },
    { name: 'Kazakhstan', code: 'KZ' },
    { name: 'Kenya', code: 'KE' },
    { name: 'Kiribati', code: 'KI' },
    { name: 'Korea', code: 'KR' },
    { name: 'Kuwait', code: 'KW' },
    { name: 'Kyrgyzstan', code: 'KG' },
    { name: 'Laos', code: 'LA' },
    { name: 'Latvia', code: 'LV' },
    { name: 'Lebanon', code: 'LB' },
    { name: 'Lesotho', code: 'LS' },
    { name: 'Liberia', code: 'LR' },
    { name: 'Liechtenstein', code: 'LI' },
    { name: 'Lithuania', code: 'LT' },
    { name: 'Luxembourg', code: 'LU' },
    { name: 'Macao', code: 'MO' },
    { name: 'Macedonia', code: 'MK' },
    { name: 'Madagascar', code: 'MG' },
    { name: 'Malawi', code: 'MW' },
    { name: 'Malaysia', code: 'MY' },
    { name: 'Maldives', code: 'MV' },
    { name: 'Mali', code: 'ML' },
    { name: 'Malta', code: 'MT' },
    { name: 'Mexico', code: 'MX' },
    { name: 'Moldova', code: 'MD' },
    { name: 'Monaco', code: 'MC' },
    { name: 'Mongolia', code: 'MN' },
    { name: 'Montenegro', code: 'CS' },
    { name: 'Montserrat', code: 'MS' },
    { name: 'Morocco', code: 'MA' },
    { name: 'Mozambique', code: 'MZ' },
    { name: 'Myanmar', code: 'MM' },
    { name: 'Namibia', code: 'NA' },
    { name: 'Nepal', code: 'NP' },
    { name: 'Netherlands', code: 'NL' },
    { name: 'New Caledonia', code: 'NC' },
    { name: 'New Zealand', code: 'NZ' },
    { name: 'Nicaragua', code: 'NI' },
    { name: 'Niger', code: 'NE' },
    { name: 'Nigeria', code: 'NG' },
    { name: 'Norway', code: 'NO' },
    { name: 'Oman', code: 'OM' },
    { name: 'Pakistan', code: 'PK' },
    { name: 'Palau', code: 'PW' },
    { name: 'Palestine', code: 'PS' },
    { name: 'Panama', code: 'PA' },
    { name: 'Papua New Guinea', code: 'PG' },
    { name: 'Paraguay', code: 'PY' },
    { name: 'Peru', code: 'PE' },
    { name: 'Philippines', code: 'PH' },
    { name: 'Poland', code: 'PL' },
    { name: 'Portugal', code: 'PT' },
    { name: 'Puerto Rico', code: 'PR' },
    { name: 'Qatar', code: 'QA' },
    { name: 'Romania', code: 'RO' },
    { name: 'Russia', code: 'RU' },
    { name: 'Rwanda', code: 'RW' },
    { name: 'Samoa', code: 'WS' },
    { name: 'Saudi Arabia', code: 'SA' },
    { name: 'Senegal', code: 'SN' },
    { name: 'Serbia', code: 'CS' },
    { name: 'Seychelles', code: 'SC' },
    { name: 'Sierra Leone', code: 'SL' },
    { name: 'Singapore', code: 'SG' },
    { name: 'Slovakia', code: 'SK' },
    { name: 'Slovenia', code: 'SI' },
    { name: 'Solomon Islands', code: 'SB' },
    { name: 'Somalia', code: 'SO' },
    { name: 'South Africa', code: 'ZA' },
    { name: 'Spain', code: 'ES' },
    { name: 'Sri Lanka', code: 'LK' },
    { name: 'Sudan', code: 'SD' },
    { name: 'Suriname', code: 'SR' },
    { name: 'Swaziland', code: 'SZ' },
    { name: 'Sweden', code: 'SE' },
    { name: 'Switzerland', code: 'CH' },
    { name: 'Syria', code: 'SY' },
    { name: 'Taiwan', code: 'TW' },
    { name: 'Tajikistan', code: 'TJ' },
    { name: 'Tanzania', code: 'TZ' },
    { name: 'Thailand', code: 'TH' },
    { name: 'Togo', code: 'TG' },
    { name: 'Tonga', code: 'TO' },
    { name: 'Trinidad', code: 'TT' },
    { name: 'Tunisia', code: 'TN' },
    { name: 'Turkey', code: 'TR' },
    { name: 'Turkmenistan', code: 'TM' },
    { name: 'Uganda', code: 'UG' },
    { name: 'Ukraine', code: 'UA' },
    { name: 'United Arab Emirates', code: 'AE' },
    { name: 'United Kingdom', code: 'GB' },
    { name: 'United States', code: 'US' },
    { name: 'Uruguay', code: 'UY' },
    { name: 'Uzbekistan', code: 'UZ' },
    { name: 'Venezuela', code: 'VE' },
    { name: 'Viet Nam', code: 'VN' },
    { name: 'Virgin Islands', code: 'VG' },
    { name: 'Western Sahara', code: 'EH' },
    { name: 'Yemen', code: 'YE' },
    { name: 'Zambia', code: 'ZM' },
    { name: 'Zimbabwe', code: 'ZW' },
  ];
  const departmentInput = document.querySelector('#departmentInput');
  const countryInput = document.querySelector('#countryInput');
  createSelectBox(departments, 'departmentId', 'displayName', departmentInput);
  createSelectBox(countries, 'name', 'name', countryInput);

  let randoButton = document.querySelector('#random');
  randoButton.addEventListener('click', initialFetch);

  const searchForm = document.querySelector('#searchForm');
  searchForm.addEventListener('submit', (event) => {
    searchCollection(event);
  });
}

function searchCollection(event) {
  event.preventDefault();
  const department = event.target[0].value;
  const country = event.target[1].value;
  const keyword = event.target[2].value;
  //  Search requires some keyword input! We search a common letter to "get something"
  //  if left blank. Other search fields added to query if they have content.
  let searchURL = `${search_url}?`;
  searchURL += department ? `departmentId=${department}&` : ``;
  searchURL += country ? `geoLocation=${country}&` : ``;
  searchURL += 'hasImages=true&q=';
  searchURL += keyword ? keyword : 'a';
  submitSearch(searchURL);
}

//submitting search
function submitSearch(searchURL) {
  const clearCont = document.querySelector('#thumbnailGrid');
  clearCont.innerHTML = ''; // clear previous results on new submission
  console.log(searchURL);
  fetch(searchURL)
    .then((res) => res.json())
    .then((resultList) => {
      buildGrid(resultList.objectIDs);
    });
}

function buildGrid(artList) {
  // Display up to 50 results, with a link to append the next 50, etc
  console.log(artList);
  if (artList.length < 50) {
    artList.forEach((artWork) => createThumbnail(artWork));
  } else {
    for (let i = 0; i < 50; i++) {
      createThumbnail(artList[i]);
    }
    artList.splice(0, 50); // remaining art IDs will be added to 'More' event listener
    let container = document.querySelector('#thumbnailGrid');
    let link = document.createElement('a');
    link.href = '#';
    link.textContent = 'More...';
    link.addEventListener('click', () => {
      link.remove();
      buildGrid(artList);
    });
    setTimeout(() => {
      container.append(link);
    }, 4000); // wait to append link to ensure it is at the end of results
  }
}

function createThumbnail(artWork) {
  const mainArt = document.querySelector('#mainArt');
  mainArt.style.display = 'none';
  let container = document.querySelector('#thumbnailGrid');
  container.style.display = 'flex';
  fetch(base_url + artWork)
    .then((res) => res.json())
    .then((artRes) => {
      let div = document.createElement('div');
      div.className = 'thumbnail';
      let img = document.createElement('img');
      img.src = artRes.primaryImage;
      div.append(img);
      setTimeout(container.append(div), 50); // throttle request speed to 20x per sec
    });
}

initialFetch();
buildSearchForm();
