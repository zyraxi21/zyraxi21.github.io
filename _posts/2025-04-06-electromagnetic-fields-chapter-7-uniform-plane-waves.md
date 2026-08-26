---
layout: post
title: 第 7 章    均匀平面电磁波
category: 电磁场与电磁波
tags: [考前复习, 电磁场与电磁波]
excerpt: "电磁场与电磁波均匀平面电磁波章节公式整理。"
---

# 7.1    均匀平面电磁波的定义
平面电磁波：等相面为平面的电磁波。
均匀平面电磁波：等相位面上的场量振幅也处处相等等的电磁波。

平面波实际上是不存在的。

# 7.2    无耗媒质中的均匀平面电磁波
传播条件：
- 无损耗媒质：$\sigma=0$，$\varepsilon''=0$，$\varepsilon$，$\mu$ 为常数。
- 无源区：$\rho=0$，$\boldsymbol{J}=\boldsymbol{0}$。
- 无界空间。

有波动方程（齐次亥姆霍兹方程）$$\begin{cases}\nabla^{2}\boldsymbol{E}+k^{2}\boldsymbol{E}=\boldsymbol{0}\\\nabla^{2}\boldsymbol{H}+k^{2}\boldsymbol{H}=\boldsymbol{0}\end{cases}$$其中 $k=\omega \sqrt{ \mu\varepsilon }$。

## 7.2.1    电场强度波动方程的解
设 $\boldsymbol{E}=\boldsymbol{a}_{x}E_{x}$，$E_{x}=E_{x}(z)$，则$$\frac{\partial^{2}E_{x}}{\partial z^{2}}+k^{2}E_{x}=0$$由此得到波动方程的解$$\boxed{\boldsymbol{E}(z)=\boldsymbol{a}_{x}E_{0}\mathrm{e}^{-\mathrm{j}kz}}$$其中 $E_{0}=E_{0m}\mathrm{e}^{\mathrm{j}\varphi_{x}}$ 为复振幅。上式的瞬时值形式为$$\boxed{\boldsymbol{E}(z,t)=\boldsymbol{a}_{x}E_{0}\cos(\omega t-kz)}$$
其中 $\boldsymbol{a}_{x}$ 为电场方向，$-kz$ 指示电磁波的传播方向。

该电磁波随时间的变化特征有：
- 周期：$T= \frac{2\pi}{\omega}$
- 频率：$f=\frac{\omega}{2\pi}$

该电磁波随空间的变化特征有：
- 波长：$\lambda=\frac{2\pi}{k}$
- 波数：$k=\frac{2\pi}{\lambda}=\omega \sqrt{ \mu\varepsilon }$

相速：等相位面运动的速度。$$v_{\mathrm{p}}=\frac{\omega}{k}=\frac{1}{\sqrt{ \mu\varepsilon }}$$相速描述场随时空的总变化，与频率无关，无色散。等相位面运动的速度等于电磁波传播的速度。

在自由空间中相速为光速，说明光是一种电磁波。

## 7.2.2    磁场强度波动方程的解
$$\boxed{H_{y}=\frac{k}{\omega \mu}E_{0}\mathrm{e}^{-\mathrm{j}kz}}$$ $$\boldsymbol{H}=\boldsymbol{a}_{y}  \frac{1}{\eta}E_{0}\mathrm{e}^{-\mathrm{j}kz}$$
其中 $\eta=\sqrt{ \frac{\mu}{\varepsilon} }$ 称为媒质的本征（特性）阻抗或波阻抗，单位为 $\mathrm{\Omega}$。在自由空间中，$\eta_{0}=\sqrt{ \frac{\mu_{0}}{\varepsilon_{0}} }=120\pi=377\ (\mathrm{\Omega})$。

对无耗媒质而言，本征阻抗为实数，仅与媒质有关。

对均匀平面电磁波，电场强度矢量、磁场强度矢量和传播方向三者之间满足右手关系：$$\boldsymbol{H}=\frac{1}{\eta}\boldsymbol{a}_{z}\times \boldsymbol{E}$$即电场和磁场无相差，大小相差 $\eta$ 倍，方向相互垂直，与传播方向成右手关系。

**无损耗媒质中的均匀平面波的传播特点**：
- 电场、磁场和传播方向互相垂直，且满足右手关系，无损耗媒质中均匀平面波为**横波**。
- 相速度与频率无关，只与媒质参数有关，**无色散**。
- 电磁波是一个**无衰减**的行波。
- 媒质的本征阻抗为**实数**，电场和磁场间**无相位差**。
- 电场能量密度与磁场能量密度相等。

## 7.2.3    在任意方向 $k$ 上传播的均匀平面电磁波
波（数）矢量$$\boldsymbol{k}=k\boldsymbol{n}=\boldsymbol{a}_{x}k_{x}+\boldsymbol{a}_{y}k_{y}+\boldsymbol{a}_{z}k_{z}$$
大小：$|\boldsymbol{k}|=k=\sqrt{ k_{y}^{2}+k_{x}^{2}+k_{z}^{2} }=\omega \sqrt{ \mu\varepsilon }$
方向：$\boldsymbol{n}$

电场强度$$\boldsymbol{E}(\boldsymbol{r})=\boldsymbol{E}_{0}\mathrm{e}^{-\mathrm{j}\boldsymbol{k\cdot r}}$$其中 $\boldsymbol{E}_{0}$ 为常矢量，大小为振幅，方向为电场方向。

等相位面：$\boldsymbol{k\cdot r}=\mathrm{const}$ 的平面。

仍满足电场方向垂直于传播方向。

## 7.2.4    均匀平面波的能量和功率
能量密度$$w=w_{\mathrm{e}}+w_{\mathrm{m}}=\frac{1}{2}\varepsilon E^{2}+ \frac{1}{2}\mu H^{2}$$由 $H=\frac{1}{\eta}E=\sqrt{ \frac{\varepsilon}{\mu} }E$，得 $\varepsilon E^{2}=\mu H^{2}$，即 $w_{\mathrm{e}}=w_{\mathrm{m}}$，故$$w=\varepsilon E^{2}=\mu H^{2}$$即电场能量和磁场能量相等。

能流密度：
- 瞬时：$$\boldsymbol{S}=\boldsymbol{E}\times \boldsymbol{H}=\boldsymbol{a}_{z}  \frac{E_{0}^{2}}{\eta_{0}}\cos ^{2}(\omega t-kz)$$
- 平均：$$\boxed{\begin{aligned}\boldsymbol{S}_{\mathrm{av}}&=\frac{1}{2}\mathrm{Re}[\boldsymbol{E}\times \boldsymbol{H}^{*}]\\&=\boldsymbol{a}_{z}  \frac{E_{0}^{2}}{2\eta}\end{aligned}}$$
在无损耗媒质中，坡印廷矢量的方向与电磁波传播方向一致。

# 7.3    有耗媒质中的均匀平面电磁波
传播条件：
- 有损耗媒质：$\sigma\neq 0$，$\varepsilon''\neq 0$，$\mu$ 仍为常数，$\varepsilon_{\mathrm{f}}=\varepsilon'-\mathrm{j}  \frac{\sigma+\omega\varepsilon''}{\omega}$。
- 无源区：$\rho=0$，$\boldsymbol{J}=\boldsymbol{0}$。
- 无界空间。

根据齐次亥姆霍兹方程 $\begin{cases}\nabla^{2}\boldsymbol{E}+k_{\mathrm{f}}^{2}\boldsymbol{E}=\boldsymbol{0}\\\nabla^{2}\boldsymbol{H}+k_{\mathrm{f}}^{2}\boldsymbol{H}=\boldsymbol{0}\end{cases}$（其中 $k_{\mathrm{f}}=\boldsymbol{n}k_{\mathrm{f}}=\boldsymbol{n}(\beta-\mathrm{j}\alpha)=\omega \sqrt{ \mu\varepsilon_{\mathrm{f}} }$ 为波数），得$$\alpha=\omega \sqrt{ \mu\varepsilon' }\left\{ \frac{1}{2}\left[ \sqrt{ 1+\left( \frac{\sigma+\omega\varepsilon''}{\omega\varepsilon'} \right)^{2} }-1 \right] \right\}^{\frac{1}{2}}$$ $$\beta=\omega \sqrt{ \mu\varepsilon' }\left\{ \frac{1}{2}\left[ \sqrt{ 1+\left( \frac{\sigma+\omega\varepsilon''}{\omega\varepsilon'} \right)^{2} }+1 \right] \right\}^{\frac{1}{2}}$$
则 $\alpha$，$\beta$ 为正实数，分别称为衰减常数和相位常数。它们都是 $\omega$ 的函数。

> 无论有无损耗，L、H、I 媒质中的时谐场均满足齐次亥姆霍兹方程。

## 7.3.1~7.3.2    沿着 $z$ 轴传播的均匀平面电磁波、沿着任意方向传播的均匀平面电磁波
波动方程的解为
- 复数：$$\boldsymbol{E}(\boldsymbol{r})=\boldsymbol{E}_{0}\mathrm{e}^{-\mathrm{j}\boldsymbol{k}_{\mathrm{f}}\boldsymbol{\cdot r}}=\boldsymbol{E}_{0}\mathrm{e}^{-\alpha \boldsymbol{n\cdot r}-\mathrm{j}\beta \boldsymbol{n\cdot r}}$$
- 瞬时：$$\boldsymbol{E}(\boldsymbol{r},t)=\boldsymbol{E}_{0}\mathrm{e}^{-\alpha \boldsymbol{n\cdot r}}\cos(\omega t-\beta \boldsymbol{n\cdot r})$$
相应地，磁场：$$\boldsymbol{H}=\frac{1}{\eta_{\mathrm{f}}}\boldsymbol{n}\times \boldsymbol{E}$$其中 $\eta_{\mathrm{f}}=\sqrt{ \frac{\mu}{\varepsilon_{\mathrm{f}}} }$ 为损耗媒质的本征阻抗。

特点：
- 电磁波仍为**均匀平面波**、**横波**。

- 有耗媒质中，均匀平面电磁波电场的振幅为 $\boldsymbol{E}_{0}\mathrm{e}^{-\alpha z}$，表明电场强度振幅随距离的增加按指数规律**减小**。$\mathrm{e}^{-\alpha z}$ 被称为**衰减因子**，$\alpha$ 被称为衰减常数，单位为 $\mathrm{Np  /m}$（奈培 / 米）。$1\ \mathrm{Np  /m}$ 的意思是电磁波向前传播 1 m 距离其振幅下降为原来的 $\frac{1}{\mathrm{e}}$。

- 将振幅衰减到初值的 $\frac{1}{\mathrm{e}}$ 时电磁波所传播的距离 $\delta$ 定义为穿透深度（趋肤深度）。

- 指数 $\mathrm{e}^{-\mathrm{j}\beta z}$ 被称为相位因子，$\beta$ 表示电磁波传播单位距离所产生的相移量，被称为相位常数，单位是 $\mathrm{rad  /m}$。

- 波的相速度为 $$v_{\mathrm{p}}=\frac{\omega}{\beta}=\frac{\omega}{\beta(\omega)}$$
> 相速与频率有关，色散波。**有耗媒质为色散媒质**。

- 有耗媒质的本征阻抗（为**复数**）：$$\eta_{\mathrm{f}}=\sqrt{ \frac{\mu}{\varepsilon_{\mathrm{f}}} }=|\eta_{\mathrm{f}}|\mathrm{e}^{\mathrm{j}\theta}$$故电场强度和磁场强度**存在固定的相位差**。

- 由瞬时坡印廷矢量公式可知，在有耗媒质中有坡印廷矢量指向 $-z$ 方向的情况，称为**功率回授现象**。

## 7.3.3    均匀平面电磁波在良介质和良导体中的传播
介质满足 $\frac{\sigma}{\omega\varepsilon'}\ll 1$。对理想介质（$\sigma=0$，$\varepsilon''=0$，无损耗媒质）有$$\alpha=0$$ $$\beta=\omega \sqrt{ \mu\varepsilon }=k$$
导体满足 $\frac{\sigma}{\omega\varepsilon'}\gg 1$。对理想导体（$\sigma=\infty$，$\varepsilon''=0$），有$$\alpha=\beta=0$$故振幅、波长、相速均为 0，即电磁波不能进入理想导体内部，

### 1. 在良介质中的传播
对良介质（$\sigma=0$，$\varepsilon''\ll \varepsilon'$，低损耗媒质），有$$\alpha \approx \frac{\omega\varepsilon''}{2}\sqrt{ \frac{\mu}{\varepsilon'} }$$ $$\beta \approx\omega \sqrt{ \mu\varepsilon' }\approx k$$

### 2. 在良导体中的传播
对良导体（$\sigma \gg \omega\varepsilon'$，$\varepsilon''=0$），有$$\boxed{\alpha=\beta \approx \sqrt{ \frac{\omega \mu\sigma}{2} }=\sqrt{ \pi f\mu\sigma }}$$
波阻抗（媒质本征阻抗）为$$\boxed{\eta_{\mathrm{f}}=\sqrt{ \frac{\mu}{\varepsilon_{\mathrm{f}}} }\approx \boxed{\sqrt{ \mathrm{\frac{j\omega \mu}{\sigma}} }}=(1+\mathrm{j})\sqrt{ \frac{\omega \mu}{2\sigma} }}$$
> 良导体中磁场相位落后电场相位 $45\degree$。

穿透深度为 $$\boxed{\delta=\frac{1}{\alpha}=\frac{1}{\sqrt{ \pi f\mu\sigma }}}$$
> 对于高频电磁波，其电磁场仅集中在导体表面很薄的一层内，相应的高频电流也集中在导体表面很薄的一层内流动，这种现象称为趋肤效应。

相速为$$\boxed{v_{\mathrm{p}}=\frac{\omega}{\beta}=\sqrt{ \frac{2\omega}{\mu\sigma} }=\frac{\omega}{\sqrt{ \pi f\mu\sigma }}}$$
> 良导体中电磁波的相速度要小于其在真空中或者介质中的相速度。

# 7.4    均匀平面电磁波的极化
电磁波的极化：空间中给定电场矢量随时间变化的方式称为电磁波的极化。通常用矢量端点随时间变化的轨迹来描述。

沿 $+z$ 方向传播的均匀平面波，其电场可表示为$$\boldsymbol{E}=\boldsymbol{a}_{x}E_{x\mathrm{m}}\cos(\omega t-kz+\varphi_{x})+\boldsymbol{a}_{y}E_{y\mathrm{m}}\cos(\omega t-kz+\varphi_{y})$$其中 $\omega t$ 形成轨迹，$E_{x\mathrm{m}}$、$\varphi_{x}$、$E_{y\mathrm{m}}$、$\varphi_{y}$ 决定轨迹形状。

> 李萨如图形：两个频率相等的相互正交的简谐振动的质点合成轨迹有三种形式：**直线、圆和椭圆**。

## 1. 椭圆极化
设 $z=0$，则 $\begin{cases}E_{x}=E_{x\mathrm{m}}\cos(\omega t+\varphi_{x}),\\E_{y}=E_{y\mathrm{m}}\cos(\omega t+\varphi_{y}),\end{cases}$ 整理得非标准形式的椭圆方程$$\left( \frac{E_{x}}{E_{x\mathrm{m}}} \right)^{2}+\left( \frac{E_{y}}{E_{y\mathrm{m}}} \right)^{2}-2  \frac{E_{x}}{E_{x\mathrm{m}}}\frac{E_{y}}{E_{y\mathrm{m}}}\cos(\varphi _{x}-\varphi_{y})=\sin ^{2}(\varphi _{x}-\varphi_{y})$$

## 2. 线极化（直线极化）
当 $\varphi _{x}-\varphi_{y}=0$ 时，椭圆方程化简为$$\frac{E_{x}}{E_{x\mathrm{m}}}=\frac{E_{y}}{E_{y\mathrm{m}}}$$
当 $\varphi _{x}-\varphi_{y}=\pi$ 时，椭圆方程化简为$$\frac{E_{x}}{E_{x\mathrm{m}}}=-\frac{E_{y}}{E_{y\mathrm{m}}}$$
均为直线方程。故 $E_{x}$ 和 $E_{y}$ 同相位或反相位时合成场表征直线极化。

## 3. 圆极化
当 $\varphi _{x}-\varphi_{y}=\pm \frac{\pi}{2}$ 且 $E_{x\mathrm{m}}=E_{y\mathrm{m}}=E_{\mathrm{m}}$ 时，椭圆方程化简为$$E_{x}^{2}+E_{y}^{2}=E_{\mathrm{m}}^{2}$$
此时$$E_{x}=E_{\mathrm{m}}\cos(\omega t+\varphi_{x})$$ $$E_{y}=\pm E_{\mathrm{m}}\sin(\omega t+\varphi_{x})$$
合成场的模值为 $|\boldsymbol{E}|=E_{\mathrm{m}}$，合成场矢量与 $x$ 轴的夹角为 $\alpha=\arctan  \frac{E_{y}}{E_{x}}=\pm (\omega t+\varphi_{x})$。

$E_{x}$ 和 $E_{y}$ 振幅相等，相位相差 $\frac{\pi}{2}$ 时合成场表征圆极化。

其中，若 $\varphi _{x}-\varphi_{y}= \frac{\pi}{2}$ 即 $E_{x}$ 相位超前 $E_{y}$ 相位 $\frac{\pi}{2}$ 时，旋转方向和波的传播方向满足右手关系，故称之为右旋圆极化波。反之为左旋圆极化波。

电场强度矢量总是由相位超前的坐标轴向着相位滞后的坐标轴旋转。
$$判断两个方向\begin{cases}电场矢量末端旋转方向\begin{cases}E_{x}\ 相位超前\ E_{y}——电场由\ x\ 转向\ y\ 正方向最大值\\E_{y}\ 相位超前\ E_{x}——电场由\ x\ 转向\ y\ 正方向最大值\end{cases}\\电磁波传播方向\end{cases}$$
任一线极化电磁波可用两个振幅相等、旋转方向相反的圆极化波表示，反之亦然。任一椭圆极化波可以由两个不等振幅的圆极化波表示，反之亦然。

应用：极化匹配（无线通信系统接收机天线极化方向应与电磁波极化方向一致，才能最大限度地接收电磁波的能量）、极化滤波。
