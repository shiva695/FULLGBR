// Dependencies Import
const mongoose = require('mongoose')

//Utils Import
const constantUtils = require('../utils/constant.utils')

const gamesSchema = new mongoose.Schema(
  {
    gameName: { type: String, required: true, trim: true },
    gameDescription: { type: String, required: true, trim: true },
    gameLogo: { type: String, required: true, trim: true },
    gameImage: { type: String, required: true, trim: true },
    overview: {
      title: { type: String, required: true, trim: true },
      description: { type: String, required: true, trim: true },
      publishers: { type: String, required: true, trim: true },
      developers: { type: String, required: true, trim: true },
      releseDate: { type: Date, required: true },
      genre: [
        {
          type: String,
          optional: true,
          trim: true,
          default: constantUtils.ACTION,
        },
      ],
      totalDownloads: { type: String, required: true, trim: true },
      platform: { type: Array, required: true },
      rating: { type: Number, required: true },
    },
    summary: {
      title: { type: String, required: true, trim: true },
      description: { type: String, required: true, trim: true },
      detail: { type: String, required: true, trim: true },
    },
    plot: {
      title: { type: String, required: true, trim: true },
      description: { type: String, required: true, trim: true },
      detail: { type: String, required: true, trim: true },
    },
    awards: {
      title: { type: String, required: true, trim: true },
      description: { type: String, required: true, trim: true },
      awards: [
        {
          name: { type: String, required: true, trim: true },
          category: { type: String, required: true, trim: true },
          date: { type: Date, required: true },
          status: {
            type: String,
            optional: true,
            trim: true,
            enum: [constantUtils.NOMINATED, constantUtils.WINNER],
            default: constantUtils.NOMINATED,
          },
        },
      ],
    },
    rating: {
      title: { type: String, required: true, trim: true },
      description: { type: String, required: true, trim: true },
      rating: { type: Number, required: true },
      ratingData: [
        {
          title: { type: String, required: true, trim: true },
          value: { type: Number, required: true },
        },
      ],
      comments: [
        {
          userName: { type: String, required: true, trim: true },
          comments: { type: String, required: true, trim: true },
          createdAt: { type: Date, required: true },
        },
      ],
    },
    gallery: {
      title: { type: String, required: true, trim: true },
      description: { type: String, required: true, trim: true },
      images: { type: Array, required: true },
    },
    founders: {
      title: { type: String, required: true, trim: true },
      description: { type: String, required: true, trim: true },
      data: [
        {
          name: { type: String, required: true, trim: true },
          designation: { type: String, required: true, trim: true },
          image: { type: String, required: true, trim: true },
        },
      ],
    },
    status: {
      type: String,
      trim: true,
      enum: [constantUtils.ENABLE, constantUtils.DISABLE, constantUtils.ARCHIEVE],
      default: constantUtils.ENABLE,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
)

const Games = new mongoose.model('games', gamesSchema)

module.exports = Games
