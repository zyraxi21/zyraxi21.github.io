---
layout: post
title: 第 4 章    恒定磁场
category: 电磁场与电磁波
tags: [考前复习, 电磁场与电磁波]
excerpt: "电磁场与电磁波恒定磁场章节公式整理。"
---

在运动电荷或电流的周围存在磁场。
$$\begin{matrix}&电荷&\xrightarrow{\text{定向运动}} &电流\\&\downarrow & &\downarrow\\&电场&\leftrightarrow  &磁场\end{matrix}$$
恒定磁场：恒定电流产生的不随时间变化的磁场。

# 4.1    恒定磁场的实验定律

## 4.1.1    安培定律
安培定律：
![图](/assets/images/electromagnetic-fields-and-waves/1743509247103.jpg)
如图，$C_{1}$ 对 $C_{2}$ 的作用力为$$\boldsymbol{F}_{C_{1}C_{2}}=\frac{\mu_{0}}{4\pi}\oint_{C_{1}}\oint_{C_{2}} \frac{I_{2}\mathrm{d}\boldsymbol{l}_{2}\times(I_{1}\mathrm{d}\boldsymbol{l}_{1}\times \boldsymbol{R}_{12})}{R_{12}^{3}}$$式中 $R_{12}$ 为电流元 $I_{1}\mathrm{d}\boldsymbol{l}_{1}$ 指向 $I_{2}\mathrm{d}\boldsymbol{l}_{2}$ 的距离矢量，$\mu_{0}=4\pi \times 10^{-7}\  \mathrm{H /m}$ 称为真空磁导率。

安培定律：电流元 $I_{1}\mathrm{d}\boldsymbol{l}_{1}$ 作用在 $I_{2}\mathrm{d}\boldsymbol{l}_{2}$ 上的力$$\mathrm{d}\boldsymbol{F}_{12}=\frac{\mu_{0}}{4\pi} \frac{I_{2}\mathrm{d}\boldsymbol{l}_{2}\times(I_{1}\mathrm{d}\boldsymbol{l}_{1}\times \boldsymbol{R}_{12})}{R_{12}^{3}}$$
磁感应强度 $\boldsymbol{B}$ 的定义式：$$\boldsymbol{B}=\frac{\mu_{0}}{4\pi}\oint_{C_{1}} \frac{I_{1}\mathrm{d}\boldsymbol{l}_{1}\times \boldsymbol{R}_{12}}{R_{12}^{3}}$$单位：$\mathrm{T}$ 或 $\mathrm{Wb /m^{2}}$。实用中常用 $\mathrm{G}$，$1\ \mathrm{T}=10^{4}\ \mathrm{G}$。

安培力公式：$$\mathrm{d}\boldsymbol{F}=I\mathrm{d}\boldsymbol{l}\times \boldsymbol{B}$$
毕奥—萨伐尔定律：$$\boldsymbol{B}=\frac{\mu_{0}}{4\pi}\oint_{C} \frac{I\mathrm{d}\boldsymbol{l}\times \boldsymbol{R}}{R^{3}}$$ $$\mathrm{d}\boldsymbol{B}=\frac{\mu_{0}}{4\pi} \frac{I\mathrm{d}\boldsymbol{l}\times \boldsymbol{R}}{R^{3}}$$
对体电流有$$\boldsymbol{B}(\boldsymbol{r})=\frac{\mu_{0}}{4\pi}\int_{V'} \frac{\boldsymbol{J}(\boldsymbol{r}')\times \boldsymbol{R}}{R^{3}}\mathrm{d}v'$$对面电流有$$\boldsymbol{B}(\boldsymbol{r})=\frac{\mu_{0}}{4\pi}\int_{S'} \frac{\boldsymbol{J}_{\mathrm{s}}(\boldsymbol{r}')\times \boldsymbol{R}}{R^{3}}\mathrm{d}s'$$

# 4.2    真空中恒定磁场的基本方程
磁场的高斯定律的微分形式：$$\nabla \boldsymbol{\cdot B}(\boldsymbol{r})=0$$物理意义：磁场是一种没有通量源的场，其场线为无始无终的闭合曲线。

磁场的高斯定律的积分形式：$$\oint_{S}\boldsymbol{B\cdot}\mathrm{d}\boldsymbol{s}=\int_{V}\nabla \boldsymbol{\cdot B}\mathrm{d}v\equiv0$$物理意义：磁感应强度穿过任意闭合曲面的通量为零。

# 4.3    真空中恒定磁场的旋度和安培环路定律
真空中安培环路定律的微分形式：$$\nabla \times \boldsymbol{B}=\mu_{0}\boldsymbol{J}$$它表明磁场是一种有旋场。

真空中安培定律的积分形式：$$\oint_{C}\boldsymbol{B\cdot}\mathrm{d}\boldsymbol{l}=\mu_{0}I$$物理意义：磁感应强度沿任一闭合路径的环量等于该闭合路径所交链的总电流的 $\mu_{0}$ 倍。

# 4.4    矢量磁位
用函数 $\boldsymbol{A}$ 的旋度来表示 $\boldsymbol{B}$，即$$\boldsymbol{B}=\nabla \times \boldsymbol{A}$$式中，$\boldsymbol{A}$ 为矢量磁位。

库伦规范：$$\nabla \boldsymbol{\cdot A}=0$$

# 4.5    介质中恒定磁场的基本方程

## 4.5.1    介质的磁化
环电流：分子电流
分子电流可用一磁偶极矩 $\boldsymbol{p}_{\mathrm{m}}$ 来描述，其定义是$$\boldsymbol{p}_{\mathrm{m}}=i\boldsymbol{s}$$
当有外加磁场作用时，这些分子磁矩将按一定方向排列，即取向排列。

### 1. 磁化强度
磁化强度矢量 $\boldsymbol{M}$ 的定义是介质中某点单位体积内的总磁偶极矩。$$\boldsymbol{M}=\lim_{ \Delta v \to 0 } \frac{\sum \boldsymbol{p}_{\mathrm{m}}}{\Delta v}=N\boldsymbol{p}_{\mathrm{m_{0}}}$$单位为 $\mathrm{A /m}$。如果介质内各点处的 $\boldsymbol{M}$ 均相同，则此介质处于均匀磁化状态。

### 2. 磁化电流
介质磁化引起的宏观电流称为磁化电流，记为 $\boldsymbol{I}_{\mathrm{m}}$。

磁化电流体密度 $\boldsymbol{J}_{\mathrm{m}}$ 与磁化强度 $\boldsymbol{M}$ 之间的关系：$$\boldsymbol{J}_{\mathrm{m}}=\nabla \times \boldsymbol{M}$$磁化电流是磁化强度矢量的旋涡源。

## 4.5.2    介质中的安培环路定律
定义磁场强度矢量$$\boldsymbol{H}=\frac{\boldsymbol{B}}{\mu_{0}}-\boldsymbol{M}$$单位：$\mathrm{A /m}$。

介质中安培环路定律的微分形式：$$\nabla \times \boldsymbol{H}=\boldsymbol{J}$$物理意义：磁场强度的旋涡源是自由电流，而磁感应强度的旋涡源是自由电流和磁化电流。

除铁磁性物质外，其他线性各向同性介质的 $\boldsymbol{M}$ 与 $\boldsymbol{H}$ 之间呈线性关系：$\boldsymbol{M}=\chi_{\mathrm{m}}\boldsymbol{H}$。式中，$\chi_{\mathrm{m}}$ 称为介质磁化率。

磁介质的本构关系：$$\boldsymbol{B}=\mu \boldsymbol{H}$$式中 $\mu_{\mathrm{r}}=(1+\chi_{\mathrm{m}})$，$\mu=\mu_{0}\mu_{\mathrm{r}}$。$\mu_{\mathrm{r}}$ 和 $\mu$ 分别称为介质的相对磁导率（无量纲）和磁导率（单位：$\mathrm{H /m}$）。顺磁性物质（产生的平均磁矩与外加磁场方向相同）：$\chi_{\mathrm{m}}>0,\mu_{\mathrm{r}}>1$；抗磁性物质（产生的平均磁矩与外加磁场方向相反）：$\chi_{\mathrm{m}}<0,\mu_{\mathrm{r}}<1$。

铁磁性物质的 $\boldsymbol{B}$ 与 $\boldsymbol{H}$ 间不满足线性关系。

# 4.7    恒定磁场的基本方程及边界条件

## 4.7.2    不同媒质分界面上的边界条件

### 1. 磁感应强度 $\boldsymbol{B}$ 的边界条件
$$\boldsymbol{n\cdot}(\boldsymbol{B}_{1}-\boldsymbol{B}_{2})=0\quad或\quad B_{1n}=B_{2n}$$

### 2. 磁场强度 $\boldsymbol{H}$ 的边界条件
$$[\boldsymbol{n}\times(\boldsymbol{H}_{1}-\boldsymbol{H}_{2})]=\boldsymbol{J}_{\mathrm{s}}\quad 或\quad H_{1t}-H_{2t}=J_{\mathrm{s}}$$
