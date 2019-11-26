
// pages/antisocial-success/antisocial-fail.js
import * as localePackage from 'locale-package';
import src from '../../config/antisocial.config';

const { Store, GlobalActions, GlobalLocalePackage } = getApp();

Page({
  data: {
    localePackage,
    src
  },
  onLoad:function(){
    // var applyResult = JSON.parse(param.applyResult);
    // var applied = applyResult.applied;
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
    wx.reLaunch({
      url: '/pages/discovery/discovery',
    })
  }
})