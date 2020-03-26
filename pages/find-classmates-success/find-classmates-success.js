import * as LocalePackage from "locale-package";
import Toast from "../../miniprogram_npm/vant-weapp/toast/toast";

const { Store } = getApp();

// pages/find-classmates/find-classmates.js
Page({
    data: {
        value: ""
    },
    onLoad: function(options) {
        let { locale } = Store.getState().global;
        wx.setNavigationBarTitle({
            title: options.class
        });
        this.setData({
            img: options.img
        });
    },
    onChange(e) {
        this.setData({
            value: e.detail
        });
    },

    onSearch() {
        Toast("搜索" + this.data.value);
    },

    onClick() {
        Toast("搜索" + this.data.value);
    }
});
