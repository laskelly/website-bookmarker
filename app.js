
// Listen for form submit
document.getElementById('my-form').addEventListener('submit', saveBookmark);

function saveBookmark(e) {
  // Get form values
  var siteName = document.getElementById('site-name').value
  var siteUrl = document.getElementById('site-url').value


  if (!validateForm(siteName, siteUrl)) {
    return false
  }

  var bookmark = {
    name: siteName,
    url: siteUrl
  }

  // Local storage test
  // localStorage.setItem('test', 'Hello world');
  // console.log(localStorage.getItem('test'))
  // localStorage.removeItem('test')
  // console.log(getItem('test'))

  // console.log(bookmark)

  // test for bookmark
  if (localStorage.getItem('bookmarks') === null) {
    // Initialize array
    var bookmarks = []
    // Add as array
    bookmarks.push(bookmark)
    // Set to local storage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  } else {
    // Fetch bookmarks from local storage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    // Add bookmark to array
    bookmarks.push(bookmark);
    // Reset to local storage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }

  // Clear form
  document.getElementById('my-form').reset()

  // Re-fetch bookmarks
  fetchBookmarks()

  //Prevent default
  e.preventDefault()
}

// Delete bookmark
function deleteBookmark(url) {
  // Get bookmarks from local storage
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  // Loop through bookmarks
  for (var i = 0; i < bookmarks.length; i++) {
    if (bookmarks[i].url = url) {
      //Remove from arr
      bookmarks.splice(i, 1)
    }
  }
  // Reset to local storage
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

  // Re-fetch bookmarks
  fetchBookmarks()
}

// Fetch bookmarks
function fetchBookmarks() {
  // Fetch bookmarks from local storage
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

  // Get output id
  var bookmarkResults = document.getElementById('bookmarks-results')

  // Build output
  bookmarkResults.innerHTML = ''
  for (var i = 0; i < bookmarks.length; i++) {
    var name = bookmarks[i].name;
    var url = bookmarks[i].url;

    bookmarkResults.innerHTML += `<div>
    <h5>${name}
    <a href="${url}" target="_blank">Visit</a> 
    <a onclick ="deleteBookmark('${url}')" class="link-danger" href="#">Delete</a> 
    </h5>
    </div>`
  }
}

// Validate form
function validateForm(siteName, siteUrl) {
  if (!siteName || !siteUrl) {
    alert('Please fill in the form')
    return false
  }

  // Regular expression to match url
  var expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);

  if (!siteUrl.match(regex)) {
    alert('Please use a valid URL')
    return false
  }

  return true
}