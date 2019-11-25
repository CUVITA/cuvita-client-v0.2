// pages/antisocial-success/antisocial-success.js
import * as localePackage from 'locale-package';
import src from '../../config/antisocial.config';

const { Store, GlobalActions, GlobalLocalePackage } = getApp();

Page({
  data: {
    localePackage,
    src
  },
  onLoad:function(){
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
  }
})