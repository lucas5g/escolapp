import { useEffect, useRef, useState } from "react";
import { Layout } from "../components/Layout";
import { Main } from "../components/Main";
import { GameInterface, GroupInterface, ModalityInterface, PlaceInterface, StudentInterface, TeamInterface, UserInterface } from "../interfaces";
import { FormSport } from "../components/Game/FormSport";
import { swr } from "../utils/swr";
import { Error } from "../components/Error";
import { Loading } from "../components/Loading";
import { Table } from "../components/Game/Table";
import { FormEdit } from "../components/Game/FormEdit";
import { storageLogged } from "../utils/storage-logged";
import moment from "moment";
import useSWRInfinite from "swr/infinite";
import { api } from "../utils/axios";
import { useNavigate, useParams } from "react-router-dom";

const PAGE_SIZE = 20

export function Game() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [gameEdit, setGameEdit] = useState({} as GameInterface)
  const [gameSport, setGameSport] = useState({} as GameInterface)
  const [routeGame, setRouteGame] = useState<GameInterface | null>(null)
  const [openFormEdit, setOpenFormEdit] = useState<boolean>(false)
  const [openFormSport, setOpenFormSport] = useState<boolean>(false)
  const formSportRef = useRef<HTMLDivElement>(null)
  const formEditRef = useRef<HTMLDivElement>(null)
  const paginationRef = useRef({
    isLoadingMore: false,
    isReachingEnd: false,
    isValidating: false,
    isDisabled: false,
  })
  const logged = storageLogged()

  const date = moment(moment().format('YYYY-MM-DD')).toISOString()
  const uri = logged?.profile === 'judge' ? `games?userId=${logged.id}&date=${date}` : 'games'

  const { data, error, size, setSize, isValidating, mutate } = useSWRInfinite<GameInterface[]>(
    (pageIndex, previousPageData) => {
      if (previousPageData && previousPageData.length < PAGE_SIZE) return null

      const separator = uri.includes('?') ? '&' : '?'
      return `${uri}${separator}page=${pageIndex + 1}&limit=${PAGE_SIZE}`
    },
    async (url) => {
      const { data } = await api.get(url)
      return data
    }
  )
  const { data: teams }: { data: TeamInterface[] } = swr('teams')
  const { data: users }: { data: UserInterface[] } = swr('users?profile=judge')
  const { data: places }: { data: PlaceInterface[] } = swr('places')
  const { data: modalities }: { data: ModalityInterface[] } = swr('modalities')
  const { data: students }: { data: StudentInterface[] } = swr('students')

  const routeGameId = id ? Number(id) : undefined
  const rawGames = data?.flat() ?? []
  const isLoadingInitialData = !data && !error
  const isLoadingMore = isLoadingInitialData || Boolean(size > 0 && data && typeof data[size - 1] === 'undefined')
  const isReachingEnd = data ? data[data.length - 1]?.length < PAGE_SIZE : false
  const hasReferenceData = Boolean(data && teams && users && places && modalities)

  function formatGame(game: GameInterface) {
    return {
      ...game,
      datetime: `${moment(game.date).format('DD/MM')} | ${game.startHours} - ${game.endHours}`,
      modality: modalities.find(modality => modality.id === game.modalityId)?.name,
      place: places.find(place => place.id === game.placeId)?.name,
      user: users.find(user => user.id === game.userId)?.email.split('@')[0],

      teams: game.teams.map(gameTeam => {
        const team = teams.find(team => team.id === gameTeam.id)
        return {
          ...gameTeam,
          students: team?.students,
          group: team?.group,
          // name: team?.name
          // students: teams.find(team => gameTeam.id === team.id)?.students,
          name: teams.find(team => team.id === gameTeam.id)?.name
        }
      })


    }
  }

  const games = hasReferenceData ? rawGames.map(formatGame) : []
  const routeGameFormatted = hasReferenceData && routeGame ? formatGame(routeGame) : null
  const gamesWithRouteGame = routeGameFormatted && !games.some(game => game.id === routeGameFormatted.id)
    ? [...games, routeGameFormatted]
    : games

  useEffect(() => {
    paginationRef.current = {
      isLoadingMore,
      isReachingEnd,
      isValidating,
      isDisabled: openFormEdit || openFormSport,
    }
  }, [isLoadingMore, isReachingEnd, isValidating, openFormEdit, openFormSport])

  useEffect(() => {
    function handleScroll() {
      const distanceToBottom = document.documentElement.scrollHeight - (window.innerHeight + window.scrollY)
      const { isLoadingMore, isReachingEnd, isValidating, isDisabled } = paginationRef.current

      if (distanceToBottom < 300 && !isDisabled && !isLoadingMore && !isReachingEnd && !isValidating) {
        paginationRef.current.isLoadingMore = true
        setSize(currentSize => currentSize + 1)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [setSize])

  useEffect(() => {
    if (openFormSport) {
      formSportRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [gameSport.id, openFormSport])

  useEffect(() => {
    if (!routeGameId) {
      setRouteGame(null)
      return
    }

    if (rawGames.some(game => game.id === routeGameId) || routeGame?.id === routeGameId) return

    let isMounted = true

    api.get(`games/${routeGameId}`).then(({ data }) => {
      if (isMounted) setRouteGame(data)
    })

    return () => {
      isMounted = false
    }
  }, [routeGameId, rawGames, routeGame?.id])

  useEffect(() => {
    if (!routeGameId || !hasReferenceData) {
      if (!routeGameId && openFormSport) {
        setGameSport({} as GameInterface)
        setOpenFormSport(false)
      }
      return
    }

    const selectedGame = gamesWithRouteGame.find(game => game.id === routeGameId)
    if (!selectedGame) return

    if (gameSport.id !== selectedGame.id || !openFormSport) {
      setGameSport(selectedGame)
      setGameEdit({} as GameInterface)
      setOpenFormEdit(false)
      setOpenFormSport(true)
    }
  }, [routeGameId, hasReferenceData, gamesWithRouteGame, gameSport.id, openFormSport])

  useEffect(() => {
    if (openFormEdit) {
      formEditRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [gameEdit.id, openFormEdit])

  if (error) return <Error error={error} />
  if (!data || !teams || !users || !places || !modalities) return <Loading />

  function setSportFormOpen(open: boolean) {
    setOpenFormSport(open)
    if (!open && routeGameId) navigate('/jogos')
  }

  return (
    <Layout>
      <Main position="col">
        <div className="flex lg:flex-row flex-col gap-3 w-full">
          <Table
            games={gamesWithRouteGame}
            gameEdit={gameEdit}
            gameSport={gameSport}
            setGameEdit={setGameEdit}
            setGameSport={setGameSport}

            openFormEdit={openFormEdit}
            setOpenFormEdit={setOpenFormEdit}
            openFormSport={openFormSport}
            setOpenFormSport={setSportFormOpen}
            refreshGames={mutate}
          />
          <FormSport
            game={gameSport}
            setGame={setGameSport}
            openForm={openFormSport}
            setOpenForm={setSportFormOpen}
            students={students}
            refreshGames={mutate}
            scrollRef={formSportRef}
          />
          <FormEdit
            game={gameEdit}
            setGame={setGameEdit}
            users={users}
            places={places}
            modalities={modalities}
            teams={teams}
            openForm={openFormEdit}
            setOpenForm={setOpenFormEdit}
            refreshGames={mutate}
            scrollRef={formEditRef}
          />
        </div>
        <div className="row w-full">
          <div className="py-4 text-center text-gray-500">
            {isLoadingMore && 'Carregando mais jogos...'}
            {isReachingEnd && games.length > 0 && 'Todos os jogos foram carregados.'}
          </div>
        </div>
      </Main>

    </Layout>
  )
}
