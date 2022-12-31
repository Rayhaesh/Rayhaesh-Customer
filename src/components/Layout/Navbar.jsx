import {
  createStyles,
  Header,
  HoverCard,
  Group,
  Button,
  UnstyledButton,
  Text,
  SimpleGrid,
  ThemeIcon,
  Anchor,
  Divider,
  Center,
  Box,
  Burger,
  Drawer,
  Collapse,
  ScrollArea,
} from '@mantine/core'
import RemsLogo from '../../assets/images/Logo.png'
import { useNavigate } from 'react-router-dom'
import { useDisclosure } from '@mantine/hooks'
import {
  IconNotification,
  IconCode,
  IconBook,
  IconChartPie3,
  IconFingerprint,
  IconCoin,
  IconChevronDown,
} from '@tabler/icons'

const useStyles = createStyles((theme) => ({
  link: {
    display: 'flex',
    alignItems: 'center',
    // height: '100%',
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    textDecoration: 'none',
    // color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    color: 'black',
    fontWeight: 500,
    fontSize: '1.2rem',
    fontFamily: 'Poppins',

    [theme.fn.smallerThan('sm')]: {
      height: 42,
      display: 'flex',
      alignItems: 'center',
      width: '100%',
    },

    ...theme.fn.hover({
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    }),
  },

  subLink: {
    width: '100%',
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
    borderRadius: theme.radius.md,

    ...theme.fn.hover({
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[7]
          : theme.colors.gray[0],
    }),

    '&:active': theme.activeStyles,
    fontFamily: 'poppins',
  },

  dropdownFooter: {
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[7]
        : theme.colors.gray[0],
    margin: -theme.spacing.md,
    marginTop: theme.spacing.sm,
    padding: `${theme.spacing.md}px ${theme.spacing.md * 2}px`,
    paddingBottom: theme.spacing.xl,
    borderTop: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1]
    }`,
    fontFamily: 'poppins',
  },

  hiddenMobile: {
    [theme.fn.smallerThan('xl')]: {
      display: 'none',
    },
  },

  hiddenDesktop: {
    [theme.fn.largerThan('xl')]: {
      display: 'none',
    },
  },
}))

const mockdata = [
  {
    icon: IconCode,
    title: 'Open source',
    description: 'This Pokémon’s cry is very loud and distracting',
  },
  {
    icon: IconCoin,
    title: 'Free for everyone',
    description: 'The fluid of Smeargle’s tail secretions changes',
  },
  {
    icon: IconBook,
    title: 'Documentation',
    description: 'Yanma is capable of seeing 360 degrees without',
  },
  {
    icon: IconFingerprint,
    title: 'Security',
    description: 'The shell’s rounded shape and the grooves on its.',
  },
  {
    icon: IconChartPie3,
    title: 'Analytics',
    description: 'This Pokémon uses its flying ability to quickly chase',
  },
  {
    icon: IconNotification,
    title: 'Notifications',
    description: 'Combusken battles with the intensely hot flames it spews',
  },
]

export default function Navbar() {
  const [
    drawerOpened,
    { toggle: toggleDrawer, close: closeDrawer },
  ] = useDisclosure(false)
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false)
  const { classes, theme } = useStyles()

  const links = mockdata.map((item) => (
    <UnstyledButton className={classes.subLink} key={item.title}>
      <Group noWrap align="flex-start">
        <ThemeIcon size={34} variant="default" radius="md">
          <item.icon size={22} color={theme.fn.primaryColor()} />
        </ThemeIcon>
        <div>
          <Text size="sm" weight={500}>
            {item.title}
          </Text>
          <Text size="xs" color="dimmed">
            {item.description}
          </Text>
        </div>
      </Group>
    </UnstyledButton>
  ))

  return (
    <>
      <Header
        height={95}
        px="md"
        // sx={{
        //   marginBottom: theme.spacing.xl,
        // }}
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 20,
        }}
      >
        <Group position="apart" sx={{ height: '100%' }}>
          <img src={RemsLogo} alt="TRA Rems Logo" />
          <Group
            sx={{ height: '100%' }}
            spacing={theme.spacing.md}
            className={classes.hiddenMobile}
          >
            <Button
              variant="outline"
              sx={{ borderColor: '#D92228' }}
              className={classes.link}
              onClick={() => {
                navigate('/')
              }}
            >
              Home
            </Button>

            <Button
              variant="outline"
              sx={{ borderColor: '#D92228' }}
              className={classes.link}
              onClick={() => {
                navigate('/')
              }}
            >
              Buy
            </Button>

            <Button
              variant="outline"
              sx={{ borderColor: '#D92228' }}
              className={classes.link}
              onClick={() => {
                navigate('/')
              }}
            >
              Sell
            </Button>

            <Button
              variant="outline"
              sx={{ borderColor: '#D92228' }}
              className={classes.link}
              onClick={() => {
                navigate('/')
              }}
            >
              Exchange
            </Button>

            <Button
              variant="outline"
              sx={{ borderColor: '#D92228' }}
              className={classes.link}
              onClick={() => {
                navigate('/')
              }}
            >
              Rent
            </Button>
          </Group>

          <Group className={classes.hiddenMobile}>
            <Button
              variant="outline"
              sx={{
                color: '#D92228',
                borderColor: '#D92228',
                fontFamily: 'poppins',
              }}
              size="md"
            >
              Log in
            </Button>
            <Button
              variant="outline"
              sx={{
                color: '#D92228',
                borderColor: '#D92228',
                fontFamily: 'poppins',
              }}
              size="md"
            >
              Sign up
            </Button>
            <Button
              sx={{
                color: 'white',
                backgroundColor: '#D92228',
                fontFamily: 'poppins',
              }}
              size="md"
            >
              Subscription
            </Button>
          </Group>

          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            className={classes.hiddenDesktop}
          />
        </Group>
      </Header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        className={classes.hiddenDesktop}
        zIndex={1000000}
      >
        <ScrollArea sx={{ height: 'calc(100vh - 60px)' }} mx="-md">
          <Divider
            my="sm"
            color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'}
          />

          <a href="#" className={classes.link}>
            Home
          </a>
          <UnstyledButton className={classes.link} onClick={toggleLinks}>
            <Center inline>
              <Box component="span" mr={5}>
                Features
              </Box>
              <IconChevronDown size={16} color={theme.fn.primaryColor()} />
            </Center>
          </UnstyledButton>
          <Collapse in={linksOpened}>{links}</Collapse>
          <a href="#" className={classes.link}>
            Learn
          </a>
          <a href="#" className={classes.link}>
            Academy
          </a>

          <Divider
            my="sm"
            color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'}
          />

          <Group position="center" grow pb="xl" px="md">
            <Button variant="default">Log in</Button>
            <Button>Sign up</Button>
          </Group>
        </ScrollArea>
      </Drawer>
    </>
  )
}
