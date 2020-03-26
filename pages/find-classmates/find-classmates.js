import * as LocalePackage from "locale-package";
import Toast from "../../miniprogram_npm/vant-weapp/toast/toast";
import * as promisfy from "../../lib/wx.promisfy";

const { Store, GlobalActions, GlobalLocalePackage } = getApp();

// pages/find-classmates/find-classmates.js
Page({
    data: {
        value: ""
    },
    onLoad: function(options) {
        let { locale, region } = Store.getState().global;
        wx.setNavigationBarTitle({
            title: LocalePackage.title[locale]
        });
        this.setData({
            locale,
            region
        });
    },
    onChange(e) {
        this.setData({
            value: e.detail
        });
    },

    onSearch() {
        wx.showLoading({
            title: GlobalLocalePackage.loading[this.data.locale]
        });
        // pre-process class num to uppercase no space string
        var classNum = this.data.value.toUpperCase().replace(/\s/g, "");
        // Fetch db
        Promise.all([
            promisfy.fetch(
                `/classmate-group?region=${this.data.region.alias}&courseNum=${classNum}`
            )
        ]).then(res => {
            // navigate to error/success page with param
            let path = res[0]["path"];
            wx.hideLoading();
            if (path == "Course Not Found") {
                wx.navigateTo({
                    url: "/pages/find-classmates-404/find-classmates-404"
                });
            } else {
                wx.navigateTo({
                    url: `/pages/find-classmates-success/find-classmates-success?class=${classNum}&img=${path}`
                });
            }
        });
    },

    onClick() {
        wx.showLoading({
            title: GlobalLocalePackage.loading[this.data.locale]
        });
        // pre-process class num to uppercase no space string
        var classNum = this.data.value.toUpperCase().replace(/\s/g, "");
        // Fetch db
        Promise.all([
            promisfy.fetch(
                `/classmate-group?region=${this.data.region.alias}&courseNum=${classNum}`
            )
        ]).then(res => {
            // navigate to error/success page with param
            let path = res[0]["path"];
            wx.hideLoading();
            if (path == "Course Not Found") {
                wx.navigateTo({
                    url: "/pages/find-classmates-404/find-classmates-404"
                });
            } else {
                wx.navigateTo({
                    url: `/pages/find-classmates-success/find-classmates-success?class=${classNum}&img=${path}`
                });
            }
        });
    }
});
