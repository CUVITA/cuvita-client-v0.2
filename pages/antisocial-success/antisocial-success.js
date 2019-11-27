// pages/antisocial-success/antisocial-success.js
import * as localePackage from 'locale-package';
import src from '../../config/antisocial.config';
import pad from '../../utils/pad-lottery-number';

const { Store, GlobalActions, GlobalLocalePackage } = getApp();
const LOTTERY_LENGTH = 6;

Page({
  data: {
    localePackage,
    twonumber: true,
    src
  },
  onLoad:function(param){
    var applyResult = JSON.parse(param.applyResult);
    var lottery_number = applyResult.lottery_number;
    if (lottery_number.length == 2){
      this.setData({
        lottery1:pad(lottery_number[0],LOTTERY_LENGTH),
        lottery2:pad(lottery_number[1],LOTTERY_LENGTH)
      })
    }
    else{
      this.setData({
        lottery1:pad(lottery_number[0],LOTTERY_LENGTH),
      })
    }
    let { locale } = Store.getState().global;
    wx.setNavigationBarTitle({
      title: localePackage.title[locale]
    });
    wx.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: '#ffffff',
    });
    this.setData({
      locale
    });
  },
  goToHomePage:function(param){
    wx.switchTab({
      url: '/pages/discovery/discovery',
    })
  }
})