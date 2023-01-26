import { Card, CardMedia } from '@mui/material'
import Button from '@mui/material/Button'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { Star } from 'phosphor-react'
import { currencyConverter } from '../helper/currencyConverter'

interface ProductCardProps {
  title: string
  brand: string
  price: number
  rating: number
  thumbnail: string
  onClick: () => void
}

export function ProductCard ({ brand, price, rating, title, thumbnail, onClick }: ProductCardProps) {
  return (
    <Card sx={{ maxWidth: '300px' }}>
      <CardMedia
        sx={{ maxHeight: '200px', objectFit: 'contain' }}
        component='img'
        image={thumbnail}
      />
      <CardContent>
        <Typography variant='h4'>{title}</Typography>
        <Typography variant='subtitle1'>{brand}</Typography>
        <Typography variant='h5' marginTop='1rem'>{currencyConverter(price)}</Typography>
        <Typography marginTop='1rem' sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Star size={20} color="#d4af37" weight="fill" />
          {rating.toFixed(2)}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          variant='contained'
          fullWidth
          onClick={onClick}
        >
          add to cart +
        </Button>
      </CardActions>
    </Card>
  )
}
