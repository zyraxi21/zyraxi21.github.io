---
layout: post
title: 第 8 章    平面电磁波的反射与折射
category: 电磁场与电磁波
tags: [考前复习, 电磁场与电磁波]
excerpt: "电磁场与电磁波平面电磁波反射与折射章节公式整理。"
---

入射波：在媒质 1 中向分界面传播的电磁波。
反射波：被反射回媒质 1 中的电磁波。
折射波（或透射波）：透射到媒质 2 中的电磁波。

# 8.1    电磁波垂直入射媒质分界面
反射系数：$$R= \frac{E_{\mathrm{r0}}}{E_{\mathrm{i0}}}$$（$R=-1$ 时为全反射）

透射系数：$$T=\frac{E_{\mathrm{t0}}}{E_{\mathrm{i0}}}$$

## 8.1.1    垂直入射理想介质与理想导体分界面
传播条件：
理想介质 $\sigma_{1}=0$，$\alpha_{1}=0$，$\beta_{1}=k_{1}$；
理想导体 $\sigma_{2}=\infty$。

入射面：入射波矢量方向与分界面法向矢量所构成的平面。

对于线极化波：反射不会改变极化方式。

目的：已知入射波求解反射波及折射波。

入射波：$$\boldsymbol{E}_{\mathrm{i}}(z)=\boldsymbol{a}_{x}E_{\mathrm{i0}}\mathrm{e}^{-\mathrm{j}\beta_{1}z}$$ $$\boldsymbol{H}_{\mathrm{i}}(z)=\boldsymbol{a}_{y}  \frac{E_{\mathrm{i0}}}{\eta_{1}}\mathrm{e}^{-\mathrm{j}\beta_{1}z}$$
反射波：$$\boldsymbol{E}_{\mathrm{r}}(z)=\boldsymbol{a}_{x}E_{\mathrm{r0}}\mathrm{e}^{\mathrm{j}\beta_{1}z}$$ $$\boldsymbol{H}_{\mathrm{r}}(z)=-\boldsymbol{a}_{y}  \frac{E_{\mathrm{r0}}}{\eta_{1}}\mathrm{e}^{\mathrm{j}\beta_{1}z}$$
由边界条件 $E_{1\mathrm{t}}(0)=E_{2\mathrm{t}}(0)$，得反射系数 $R= \frac{E_{\mathrm{r0}}}{E_{\mathrm{i0}}}=-1$，为全反射。

得合成波$$\boxed{\boldsymbol{E}_{1}=-\boldsymbol{a}_{x}2\mathrm{j}E_{\mathrm{i 0}}\sin\beta_{1}z}$$ $$\boxed{\boldsymbol{H}_{1}=\boldsymbol{a}_{y}  \frac{2E_{\mathrm{i 0}}}{\eta_{1}}\cos\beta_{1}z}$$
> 合成波的传播特性不确定，不能用 $\boldsymbol{n}\times \boldsymbol{E}_{1}$ 来求 $\boldsymbol{H}_{1}$。

瞬时值形式：$$\boldsymbol{E}_{1}(z,t)=\boldsymbol{a}_{x}2E_{\mathrm{i 0}}\sin\beta_{1}z \sin\omega t$$ $$\boldsymbol{H}_{1}(z,t)=\boldsymbol{a}_{y}  \frac{2E_{\mathrm{i 0}}}{\eta_{1}}\cos\beta_{1}z\cos\omega t$$
波节点：振幅为最小值的点。
波腹点：振幅为最大值的空间点。

由 $\sin\beta_{1}z=0$ 解得电场波节点位置为$$z=-  \frac{n\lambda_{1}}{2},\quad n=0,1,2,\cdots$$该处电场振幅为零，磁场振幅最大，为 $2H_{\mathrm{i 0}}$。（电场波节，磁场波腹）


由 $\cos\beta_{1}z=0$ 解得磁场波节点位置为$$z=-  \frac{2n+1}{4}\lambda_{1},\quad n=0,1,2,\cdots$$该处磁场振幅为零，电场振幅最大，为 $2E_{\mathrm{i 0}}$。（电场波腹，磁场波节）

行波：等相位面沿固定方向移动的电磁波。
驻波：波节点和波腹点位置固定不变的电磁波。不能向某一方向上传播能量。

电场与磁场的驻波在空间上错开 $\frac{\lambda_{1}}{4}$，在相位上相差 $\frac{\pi}{2}$。

故$$\boldsymbol{S}_{\mathrm{1av}}=\frac{1}{2}\mathrm{Re}[\boldsymbol{E}_{1}\times \boldsymbol{H}_{1}^{*}]=\boldsymbol{0}$$
理想导体表面的面电流密度矢量为$$\boldsymbol{J}_{\mathrm{s}}=\boldsymbol{a}_{ x}  \frac{2E_{\mathrm{i 0}}}{\eta_{1}}$$
在理想导体表面上均匀分布着面电流，成为反射波和透射波的波源。电流面密度的大小随时间呈余弦变化。

## 8.1.2    垂直入射理想介质与理想介质分界面
传播条件：$\sigma_{1}=\sigma_{2}=0$，$\alpha_{1}=\alpha_{2}=0$，$\beta_{1}=k_{1}$，$\beta_{2}=k_{2}$。

入射波：沿 $+z$ 方向传播，电场沿 $x$ 方向极化。$$\boldsymbol{E}_{\mathrm{i}}(z)=\boldsymbol{a}_{x}E_{\mathrm{i0}}\mathrm{e}^{-\mathrm{j}\beta_{1}z}$$ $$\boldsymbol{H}_{\mathrm{i}}(z)=\boldsymbol{a}_{y}  \frac{E_{\mathrm{i0}}}{\eta_{1}}\mathrm{e}^{-\mathrm{j}\beta_{1}z}$$
反射波：$$\boldsymbol{E}_{\mathrm{r}}(z)=\boldsymbol{a}_{x}RE_{\mathrm{i0}}\mathrm{e}^{\mathrm{j}\beta_{1}z}$$ $$\boldsymbol{H}_{\mathrm{r}}(z)=-\boldsymbol{a}_{y}  \frac{RE_{\mathrm{i0}}}{\eta_{1}}\mathrm{e}^{\mathrm{j}\beta_{1}z}$$
透射波（2 区无衰减的行波）：$$\boldsymbol{E}_{\mathrm{t}}(z)=\boldsymbol{a}_{x}TE_{\mathrm{i0}}\mathrm{e}^{-\mathrm{j}\beta_{2}z}$$ $$\boldsymbol{H}_{\mathrm{t}}(z)=\boldsymbol{a}_{y}  \frac{TE_{\mathrm{i0}}}{\eta_{2}}\mathrm{e}^{-\mathrm{j}\beta_{2}z}$$
1 区合成波的电场和磁场：$$\boldsymbol{E}_{1}=\boldsymbol{a}_{x}E_{\mathrm{i 0}}(\mathrm{e}^{-\mathrm{j}\beta_{1}z}+R\mathrm{e}^{\mathrm{j\beta_{1}z}})$$ $$\boldsymbol{H}_{1}=\boldsymbol{a}_{y}  \frac{E_{\mathrm{i 0}}}{\eta_{1}}(\mathrm{e}^{-\mathrm{j}\beta_{1}z}-R\mathrm{e}^{\mathrm{j\beta_{1}z}})$$
由边界条件 $E_{\mathrm{1t}}(0)=E_{\mathrm{2t}}(0)$、$H_{\mathrm{1t}}(0)=H_{\mathrm{2t}}(0)$（理想介质 $J_{\mathrm{s}}=0$），得
反射系数：$$\boxed{R= \frac{\eta_{2}-\eta_{1}}{\eta_{2}+\eta_{1}}}$$
透射系数：$$\boxed{T=\frac{2\eta_{2}}{\eta_{2}+\eta_{1}}}$$
将 $\boldsymbol{E}_{1}$ 的表达式变换后得到瞬时值$$\boldsymbol{E}_{1}(z,t)=\boldsymbol{a}_{x}E_{\mathrm{i 0}}[(1+R)\cos(\omega t-\beta_{1}z)-2R\sin\beta_{1}z\sin\omega t]$$式中第一项为行波，第二项为驻波。故合成场为行驻波。

1 区合成波的电场振幅$$|\boldsymbol{E}_{1}|=E_{\mathrm{i 0}}\sqrt{ 1+R^{2}+2R\cos 2\beta_{1}z }$$
- 故当 $R>0$（$\eta_{2}>\eta_{1}$）时，最大振幅 $|\boldsymbol{E}_{1}(z)|_{\mathrm{max}}=E_{\mathrm{i 0}}(1+R)$，最小振幅 $|\boldsymbol{E}_{1}(z)|_{\mathrm{min}}=E_{\mathrm{i 0}}(1-R)$。电场波腹点位置$$\boxed{z_{\mathrm{max}}=-  \frac{n\lambda_{1}}{2}, \quad n=0,1,2,\cdots}$$波节点位置$$\boxed{z_{\mathrm{min}}=-  \frac{(2n+1)\lambda_{1}}{4}, \quad n=0,1,2,\cdots}$$

- 当 $R<0$（$\eta_{2}<\eta_{1}$）时，最大振幅 $|\boldsymbol{E}_{1}(z)|_{\mathrm{max}}=E_{\mathrm{i 0}}(1-R)$，最小振幅 $|\boldsymbol{E}_{1}(z)|_{\mathrm{min}}=E_{\mathrm{i 0}}(1+R)$。电场波腹点位置$$\boxed{z_{\mathrm{max}}=-  \frac{(2n+1)\lambda_{1}}{4}, \quad n=0,1,2,\cdots}$$波节点位置$$\boxed{z_{\mathrm{min}}=-  \frac{n\lambda_{1}}{2}, \quad n=0,1,2,\cdots}$$
合成波的磁场：$$\boldsymbol{H}_{1}=\boldsymbol{a}_{y} \frac{E_{\mathrm{i 0}}}{\eta_{1}}\mathrm{e}^{-\mathrm{j}\beta_{1}z}(1-R \mathrm{e}^{\mathrm{j}2\beta_{1}z})$$磁场振幅：$$|\boldsymbol{H}_{1}|=\frac{E_{\mathrm{i 0}}}{\eta_{1}}\sqrt{ 1+R^{2}-2R\cos 2\beta_{1}z }$$

合成波的特点：
- $|\boldsymbol{H}_{1}|$ 与 $|\boldsymbol{E}_{1}|$ 的最大值和最小值恰好互换，且相位相差 $\frac{\pi}{2}$。
- 定义驻波比（驻波系数）$$\mathrm{SWR}=\frac{1+|R|}{1-|R|}$$则 $|R|=0$ 时无反射，则 $\mathrm{SWR}=1$，为纯行波，即 $\eta_{1}=\eta_{2}$，为同一种媒质。$|R|=1$ 时全反射，则 $\mathrm{SWR}=\infty$，为纯驻波。$0<|R|<1$ 时 $1<\mathrm{SWR}<\infty$，为混合波。
- 平均坡印廷矢量$$\boldsymbol{S}_{\mathrm{1av}}=\boldsymbol{S}_{\mathrm{2av}}$$其中 $\boldsymbol{S}_{\mathrm{1av}}=\boldsymbol{S}_{\mathrm{iav}}-\boldsymbol{S}_{\mathrm{rav}}$。

# 8.2    电磁波斜入射媒质分界面
![图](/assets/images/electromagnetic-fields-and-waves/IMG_20250525_160627.jpg)
传播条件：入射波为单色均匀平面波，媒质为 L、H、I 媒质。

入射波$$\boldsymbol{E}_{\mathrm{i}}(z)=\boldsymbol{E}_{\mathrm{i 0}}\mathrm{e}^{\mathrm{j(\omega_{\mathrm{i}}t-\boldsymbol{k}_{\mathrm{i}}\boldsymbol{\cdot r})}}$$ $$\boldsymbol{H}_{\mathrm{i}}(z)=\frac{1}{\omega_{\mathrm{i}}\mu_{1}}\boldsymbol{k}_{\mathrm{i}}\times \boldsymbol{E}_{\mathrm{i}}(z)$$
反射波$$\boldsymbol{E}_{\mathrm{r}}(z)=\boldsymbol{E}_{\mathrm{r 0}}\mathrm{e}^{\mathrm{j(\omega_{\mathrm{r}}t-\boldsymbol{k}_{\mathrm{r}}\boldsymbol{\cdot r})}}$$ $$\boldsymbol{H}_{\mathrm{r}}(z)=\frac{1}{\omega_{\mathrm{r}}\mu_{1}}\boldsymbol{k}_{\mathrm{r}}\times \boldsymbol{E}_{\mathrm{r}}(z)$$
透射波$$\boldsymbol{E}_{\mathrm{t}}(z)=\boldsymbol{E}_{\mathrm{t 0}}\mathrm{e}^{\mathrm{j(\omega_{\mathrm{t}}t-\boldsymbol{k}_{\mathrm{t}}\boldsymbol{\cdot r})}}$$ $$\boldsymbol{H}_{\mathrm{t}}(z)=\frac{1}{\omega_{\mathrm{t}}\mu_{1}}\boldsymbol{k}_{\mathrm{t}}\times \boldsymbol{E}_{\mathrm{t}}(z)$$

基本规律：
- 反射波、折射波与入射波的频率相等$$\omega_{\mathrm{i}}=\omega_{\mathrm{r}}=\omega_{\mathrm{t}}$$
- 入射波、反射波和折射波共面
- 反射定律$$\theta_{\mathrm{i}}=\theta_{\mathrm{r}}$$
- 折射定律（斯涅尔定律）$$\frac{\sin \theta_{\mathrm{i}}}{\sin\theta_{\mathrm{t}}}=\frac{n_{2}}{n_{1}}=n_{21}$$式中折射率 $n_{1}=\sqrt{ \mu_{1}\varepsilon_{1} }$，$n_{2}=\sqrt{ \mu_{2}\varepsilon_{2} }$。媒质 2 相对于媒质 1 的相对折射率 $n_{21}=\frac{n_{2}}{n_{1}}$。

各波传播方向的单位矢量为$$\boldsymbol{n}_{\mathrm{i}}=\boldsymbol{a}_{x}\sin\theta_{\mathrm{i}}+\boldsymbol{a}_{z}\cos\theta_{\mathrm{i}}$$ $$\boldsymbol{n}_{\mathrm{r}}=\boldsymbol{a}_{x}\sin\theta_{\mathrm{i}}-\boldsymbol{a}_{z}\cos\theta_{\mathrm{i}}$$ $$\boldsymbol{n}_{\mathrm{t}}=\boldsymbol{a}_{x}\sin\theta_{\mathrm{t}}+\boldsymbol{a}_{z}\cos\theta_{\mathrm{t}}$$
由 $\boldsymbol{k}_{\mathrm{i}}\boldsymbol{\cdot r}=k_{\mathrm{i}}\boldsymbol{n}_{\mathrm{i}}\boldsymbol{\cdot r}$，得入射波$$\boldsymbol{E}_{\mathrm{i}}(z)=\boldsymbol{E}_{\mathrm{i 0}}\mathrm{e}^{-\mathrm{j}k_{1}(x\sin\theta_{\mathrm{i}}+z\cos\theta_{\mathrm{i}})}$$ $$\boldsymbol{H}_{\mathrm{i}}(z)=\frac{1}{\eta_{1}}\boldsymbol{n}_{\mathrm{i}}\times \boldsymbol{E}_{\mathrm{i}}(z)$$
反射波$$\boldsymbol{E}_{\mathrm{r}}(z)=\boldsymbol{E}_{\mathrm{r 0}}\mathrm{e}^{-\mathrm{j}k_{1}(x\sin\theta_{\mathrm{i}}-z\cos\theta_{\mathrm{i}})}$$ $$\boldsymbol{H}_{\mathrm{r}}(z)=\frac{1}{\eta_{1}}\boldsymbol{n}_{\mathrm{r}}\times \boldsymbol{E}_{\mathrm{r}}(z)$$
透射波$$\boldsymbol{E}_{\mathrm{t}}(z)=\boldsymbol{E}_{\mathrm{t 0}}\mathrm{e}^{-\mathrm{j}k_{2}(x\sin\theta_{\mathrm{t}}+z\cos\theta_{\mathrm{t}})}$$ $$\boldsymbol{H}_{\mathrm{t}}(z)=\frac{1}{\eta_{1}}\boldsymbol{n}_{\mathrm{t}}\times \boldsymbol{E}_{\mathrm{t}}(z)$$
根据 $z=0$ 平面上边界条件 $E_{\mathrm{1t}}(0)=E_{\mathrm{2t}}(0)$，得$$\boldsymbol{n}\times (\boldsymbol{E}_{\mathrm{i 0}}+ \boldsymbol{E}_{\mathrm{r 0}})=\boldsymbol{n}\times \boldsymbol{E}_{\mathrm{t 0}}$$
根据 $z=0$ 平面上边界条件 $H_{\mathrm{1t}}(0)=H_{\mathrm{2t}}(0)$，得$$\boldsymbol{n}\times  \frac{1}{\eta_{1}}(\boldsymbol{n}_{\mathrm{i}}\times \boldsymbol{E}_{\mathrm{i 0}}+\boldsymbol{n}_{\mathrm{r}}\times \boldsymbol{E}_{\mathrm{r 0}})=\boldsymbol{n}\times  \frac{1}{\eta_{2}}(\boldsymbol{n}_{\mathrm{t}}\times \boldsymbol{E}_{\mathrm{t 0}})$$式中等号右侧没有 $+\boldsymbol{J}_{\mathrm{s}}$ 这一项，因为只要有透射波就不会有表面电流，故 $\boldsymbol{J}_{\mathrm{s}}=\boldsymbol{0}$。

振幅关系——费涅尔公式：
垂直极化入射：电场矢量垂直于入射面的分量。
令 $R_{\perp}$、$T_{\perp}$ 分别为垂直极化斜入射的反射系数和透射系数，则费涅尔公式：$$R_{\perp}=\left( \frac{E_{\mathrm{r 0}}}{E_{\mathrm{i 0}}} \right)_{\perp}=\frac{\eta_{2}\cos\theta_{\mathrm{i}}-\eta_{1}\cos\theta_{\mathrm{t}}}{\eta_{2}\cos\theta_{\mathrm{i}}+\eta_{1}\cos\theta_{\mathrm{t}}}$$ $$T_{\perp}=\left( \frac{E_{\mathrm{t 0}}}{E_{\mathrm{i 0}}} \right)_{\perp}=\frac{2\eta_{2}\cos\theta_{\mathrm{i}}}{\eta_{2}\cos\theta_{\mathrm{i}}+\eta_{1}\cos\theta_{\mathrm{t}}}$$故有
$$1+R_{\perp}=T_{\perp}$$

平行极化入射：电场矢量平行于入射面的分量。
令 $R_{\mathop{//}}$、$T_{\mathop{//}}$ 分别为平行极化斜入射的反射系数和透射系数。则费涅尔公式：$$R_{\mathop{//}}=\left( \frac{E_{\mathrm{r 0}}}{E_{\mathrm{i 0}}} \right)_{\mathop{//}}=\frac{\eta_{2}\cos\theta_{\mathrm{t}}-\eta_{1}\cos\theta_{\mathrm{i}}}{\eta_{2}\cos\theta_{\mathrm{t}}+\eta_{1}\cos\theta_{\mathrm{i}}}$$ $$T_{\mathop{//}}=\left( \frac{E_{\mathrm{t 0}}}{E_{\mathrm{i 0}}} \right)_{\mathop{//}}=\frac{2\eta_{2}\cos\theta_{\mathrm{i}}}{\eta_{2}\cos\theta_{\mathrm{t}}+\eta_{1}\cos\theta_{\mathrm{i}}}$$故有$$(1+R_{\mathop{//}})  \frac{\cos\theta_{\mathrm{i}}}{\cos \theta_{\mathrm{t}}}=T_{\mathop{//}}$$

## 8.2.1    斜入射理想介质与理想导体分界面

### 1. 垂直极化斜入射
设电场矢量沿 $+y$ 方向。合成场方程$$E_{y}(x,z)=-2\mathrm{j}E_{\mathrm{i 0}}\sin(\beta_{1}z\cos\theta_{\mathrm{i}})\mathrm{e}^{-\mathrm{j}\beta_{1}x\sin\theta_{\mathrm{i}}}$$ $$H_{x}(x,z)=-\frac{2E_{\mathrm{i 0}}}{\eta_{1}}\cos\theta_{\mathrm{i}}\cos(\beta_{1}z\cos\theta_{\mathrm{i}})\mathrm{e}^{-\mathrm{j}\beta_{1}x\sin\theta_{\mathrm{i}}}$$ $$H_{z}(x,z)=-\mathrm{j}\frac{2E_{\mathrm{i 0}}}{\eta_{1}}\sin\theta_{\mathrm{i}}\sin(\beta_{1}z\cos\theta_{\mathrm{i}})\mathrm{e}^{-\mathrm{j}\beta_{1}x\sin\theta_{\mathrm{i}}}$$
由此可得
合成波沿 $x$ 方向传播（即为行波），其相速为$$v_{\mathrm{p}x}=\frac{\omega}{\beta_{1}\sin\theta_{\mathrm{i}}}=\frac{v_{\mathrm{p}1}}{\sin\theta_{\mathrm{i}}}$$
传播方向没有电场分量，只有磁场分量，称为 **TE 波**（或**横电波**）
合成波为**非均匀平面波**（等振幅面平行于分界面，等相位面垂直于分界面）
$E_y$ 和 $E_x$ 之间存在 $\frac{\pi}{2}$ 相位差，则沿 $z$ 方向平均坡印廷矢量为 0。
合成波振幅沿 $z$ 方向呈驻波分布，$E_{y}$ 和 $H_{z}$ 振幅波节点及波腹点 $\beta_{1}z\cos\theta_{\mathrm{i}}=-n\pi$ 即$$z=- \frac{n\lambda_{1}}{2\cos\theta_{\mathrm{i}}},\quad n=0,1,2,\cdots$$

## 8.2.2 全透射与全反射

### 1. 全透射
条件：媒质 1 和媒质 2 均为无损耗的非铁磁性物质。$\sigma_{1}=\sigma_{2}=0$，$\mu_{1}=\mu_{2}=\mu_{0}$。

定义：当均匀平面波以某一角度入射到介质分界面时，可能会使 $R_{\perp}=0$ 或 $R_{\mathop{//}}=0$，表明入射波完全透射到第二种媒质而不发生反射的现象。

#### ① 平行极化斜入射
平行极化斜入射 $R_{//}=0$，布儒斯特角$$\sin\theta_{\mathrm{b}}=\sqrt{ \frac{\varepsilon_{2}}{\varepsilon_{1}+\varepsilon_{2}} }$$故$$\theta_{\mathrm{b}}+\theta_{\mathrm{t}}=\frac{\pi}{2}$$
当 $\theta_{\mathrm{b}}=\sin^{-1} \sqrt{ \frac{\varepsilon_{2}}{\varepsilon_{1}+\varepsilon_{2}} }=\tan^{-1} \sqrt{ \frac{\varepsilon_{2}}{\varepsilon_{1}} }$ 时，平行极化入射波不反射，发生全透射。

#### ② 垂直极化斜入射
垂直极化斜入射 $R_{\perp}=0$，$$\varepsilon_{2}=\varepsilon_{1}$$
在非铁磁性物质中，对于垂直极化入射的电磁波不存在布儒斯特角，不发生全透射。

#### ③应用
极化滤波：当一束椭圆极化波以布儒斯特角入射到两种介质的分界面时，反射波中将只剩下垂直极化波，平行极化完全折射到媒质 2 中。

### 2. 全反射
当电磁波由光密介质斜入射到光疏介质的分界面上时（$n_{1}>n_{2}$ 时），必存在一个小于 $\frac{\pi}{2}$ 的入射角使折射角 $\theta_{\mathrm{t}}=\frac{\pi}{2}$，此入射角称为临界角$$\theta_{\mathrm{c}}=\sin^{-1} \frac{n_{2}}{n_{1}}$$当 $\theta_{\mathrm{i}}>\theta_{\mathrm{c}}$ 时，$R_{\perp}=\mathrm{e}^{-\mathrm{j}\varphi_{\perp}}$，$R_{/ /}=\mathrm{e}^{-\mathrm{j}\varphi_{/ /}}$。无论平行极化入射还是垂直极化入射都有 $|R_{\perp}|=|R_{/ /}|=1$，说明发生了全反射。

当发生全反射时，$T_{\perp}\neq 0$，$T_{/ /}\neq 0$，因此媒质 2 中仍有透射波。只是沿 $z$ 方向无实功率流，透射波沿 $x$ 方向。
