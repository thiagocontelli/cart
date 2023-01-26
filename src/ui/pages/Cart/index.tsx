import { Box, Button, Container, Dialog, DialogActions, DialogTitle, Typography } from '@mui/material'
import { ArrowLeft, SmileySad } from 'phosphor-react'
import { useState } from 'react'
import { Product } from '../../../model/Product'
import { CartCard } from '../../components/CartCard'
import { Path } from '../../enum/Path'
import { currencyConverter } from '../../helper/currencyConverter'
import { useCart } from '../../hooks/useCart'
import { useNavigation } from '../../hooks/useNavigation'

export function Cart () {
  const h = useCart()
  const { navigate } = useNavigation()
  const prices = h.cart.map(it => it.price * it.amount)
  const total = prices.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
  const [open, setOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState({} as Product)

  function goToHome () {
    navigate(Path.Home)
  }

  return (
    <>
      {h.cart.length > 0
        ? (
        <Container>
          <Button
            startIcon={<ArrowLeft size={24} color="#1976d2" />}
            onClick={goToHome}
            sx={{ margin: '2rem 0' }}
          >
            back to home page
          </Button>
          {h.cart.map((it, i) => (
            <Box key={i}>
              <CartCard
                product={it}
                onClickMinus={() => {
                  if (it.amount === 1) {
                    setOpen(true)
                    setSelectedProduct(it)
                    return
                  }
                  h.decreaseAmount(it)
                }}
                onClickPlus={() => { h.increaseAmount(it) }}
              />
              <div style={{ padding: '1rem' }}></div>
            </Box>
          ))}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              position: 'sticky',
              bottom: 0,
              background: 'white',
              padding: '1rem 0',
              zIndex: 10,
              borderTop: '1px solid lightgray'
            }}
          >
            <Typography variant='h5'>Total: {currencyConverter(total)}</Typography>
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
          <Button variant='contained' onClick={goToHome}>
            back to home page
          </Button>
        </Container>
          )}
      <Dialog
        open={open}
        onClose={() => { setOpen(false) }}
        maxWidth='xs'
      >
        <DialogTitle>
          Are you sure you want to remove this product?
        </DialogTitle>
        <DialogActions>
          <Button variant='outlined' onClick={() => { setOpen(false) }}>cancel</Button>
          <Button variant='contained' color='error' onClick={() => {
            setOpen(false)
            h.decreaseAmount(selectedProduct)
          }} autoFocus>
            remove
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
