//////////////// EXPRESS ////////////////
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');
const compression = require('compression');

//////////////// FILES ////////////////
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const viewRouter = require('./routes/viewRouter');
const characterRouter = require('./routes/characterRouter');
const userRouter = require('./routes/userRouter');
const spellRouter = require('./routes/spellRouter');
const classRouter = require('./routes/classRouter');
const spellSlotRouter = require('./routes/spellSlotRouter');

//////////////// MIDDLEWARE ////////////////
const app = express();

app.enable('trust proxy');

// Frontend
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// Development logging:
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Data sanitisation & compression
app.use(helmet());
app.use(
  '/api',
  rateLimit({
    max: 100, // Only 100 requests from the same IP per hour
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests from this IP, please try again in an hour!',
  })
);
app.use(express.json({ limit: '10kb' })); // Parse body
app.use(cookieParser()); // Parse cookies
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(mongoSanitize());
app.use(xss());
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsQuantity',
      'ratingsAverage',
      'maxGroupSize',
      'difficulty',
      'price',
    ],
  })
);
app.use(compression());

//////////////// ROUTES ////////////////
app.use('/', viewRouter);
app.use('/api/v1/characters', characterRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/spells', spellRouter);
app.use('/api/v1/spellslots', spellSlotRouter);
app.use('/api/v1/classes', classRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
