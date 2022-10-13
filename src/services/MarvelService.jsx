import useHttp from './../components/hooks/http.hook'

const useMarvelService = () => {
  const { process, setProcess, request, clearError } = useHttp()

  const _apiBase = 'https://gateway.marvel.com:443/v1/public/'
  const _apiKey = 'apikey=2d21e8ae83ab24afc9e90c7298a0a89c'
  const _baseOffset = 210

  //* поиск по имени
  const getCharacterByName = async (name) => {
    const res = await request(`${_apiBase}characters?name=${name}&${_apiKey}`)
    return res.data.results.map(_transformCharacter)
  }

  //* все персонажи
  const getAllCharacters = async (offset = _baseOffset) => {
    const res = await request(
      `${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`,
    )

    return res.data.results.map(_transformCharacter)
  }

  //* 1 персонаж
  const getCharacters = async (id) => {
    const res = await request(`${_apiBase}/characters/${id}?${_apiKey}`)

    return _transformCharacter(res.data.results[0])
  }

  //* 1 комикс
  const getComics = async (id) => {
    const res = await request(`${_apiBase}/comics/${id}?${_apiKey}`)

    return _transformComics(res.data.results[0])
  }

  //* все комиксы
  const getAllComics = async (offset = 0) => {
    const res = await request(
      `${_apiBase}comics?orderBy=issueNumber&limit=8&offset=${offset}&${_apiKey}`,
    )

    return res.data.results.map(_transformComics)
  }

  //? получение избранных данных о персонаже
  const _transformCharacter = (char) => {
    return {
      id: char.id,
      name:
        char.name.length < 30
          ? char.name
          : ` ${char.name.replace(/\./, '').slice(0, 30)}...`,
      description: char.description
        ? `${char.description.replace(/\./, '').substring(0, 210)}...`
        : 'There is no description for this character',
      thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
      homepage: char.urls[0].url,
      wiki: char.urls[1].url,
      comics: char.comics.items,
    }
  }

  const _transformComics = (comics) => {
    return {
      id: comics.id,
      title: comics.title,
      description: comics.description || 'There is no description',
      pageCount: comics.pageCount
        ? `${comics.pageCount} p.`
        : 'No information about the number of pages',
      thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
      language: comics.textObjects.language || 'en-us',
      price: comics.prices.price ? `${comics.prices.price}$` : 'not available',
    }
  }

  return {
    process,
    setProcess,
    clearError,
    getAllCharacters,
    getCharacters,
    getAllComics,
    getComics,
    getCharacterByName,
  }
}

export default useMarvelService
