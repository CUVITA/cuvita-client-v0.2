import * as promisfy from '../../lib/wx.promisfy';
import * as localePackage from 'locale-package';

const { Store, GlobalLocalePackage } = getApp();

Page({
  data: {
    articles: [{}, {}, {}]
  },
  onLoad() {
    let { locale, systemInfo, region } = Store.getState().global;
    this.setData({
      locale, systemInfo
    });
    wx.setNavigationBarTitle({
      title: localePackage.title[this.data.locale]
    });
    wx.showLoading({
      title: GlobalLocalePackage.loading[this.data.locale]
    });
    promisfy.fetch(`/article/lists/${ region.alias }`)
      .then(articles => {
        this.setData({ articles });
        wx.hideLoading();
      });
  }
})