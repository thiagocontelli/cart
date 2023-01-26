import { Box, Button, Container, Typography } from '@mui/material'
import { SmileySad } from 'phosphor-react'
import { CartCard } from '../../components/CartCard'
import { Path } from '../../enum/Path'
import { currencyConverter } from '../../helper/currencyConverter'
import { useCart } from '../../hooks/useCart'
import { useNavigation } from '../../hooks/useNavigation'

export function Cart () {
  const h = useCart()
  const { navigate } = useNavigation()

  return (
    <>
      {h.cart.length > 0
        ? (
        <Container>
          {h.cart.map((it, i) => (
            <Box key={i}>
              <CartCard
                product={it}
                onClickMinus={() => { h.decreaseAmount(it) }}
                onClickPlus={() => { h.increaseAmount(it) }}
              />
              <div style={{ padding: '1rem' }}></div>
            </Box>
          ))}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Typography variant='h5'>Total: {currencyConverter(500)}</Typography>
          </Box>
        </Container>
          )
        : (
        <Container
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh'
          }}
        >
          <SmileySad size={128} color="#828282" />
          <Typography textAlign='center' fontSize={24} marginBottom='3rem'>Cart is empty</Typography>
          <Button variant='contained' onClick={() => { navigate(Path.Home) }}>
            back to home page
          </Button>
        </Container>
          )}

    </>
  )
}
