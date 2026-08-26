---
layout: post
title: 第 10 章    电磁波的辐射
category: 电磁场与电磁波
tags: [考前复习, 电磁场与电磁波]
excerpt: "电磁场与电磁波电磁波辐射章节公式整理。"
---

天线：能向自由空间辐射电磁波或从自由空间接收电磁波的装置。

# 10.1    电磁场的标量位、矢量位及其微分方程
由 $\nabla \boldsymbol{\cdot B}=0$ 知存在矢量函数 $\boldsymbol{A}$，使得$$\boldsymbol{B}=\nabla \times \boldsymbol{A}$$称 $\boldsymbol{A}$ 为动态矢量磁位（磁矢位）。

将上式代入 $\nabla \times \boldsymbol{E}=- \frac{\partial \boldsymbol{B}}{\partial t}$，得 $\nabla \times\left( \boldsymbol{E}+ \frac{\partial \boldsymbol{A}}{\partial t} \right)=0$，则存在标量函数 $\phi$，使得$$\boldsymbol{E}+ \frac{\partial \boldsymbol{A}}{\partial t}=-\nabla \phi$$称 $\phi$ 为标量电位（电标位）。

为确定矢量函数 $\boldsymbol{A}$，令$$\boxed{\nabla \boldsymbol{\cdot A}+\mu\varepsilon  \frac{\partial \phi}{\partial t}=0}$$上式称为**洛伦兹规范（洛伦兹条件）**，则得到达朗贝尔方程（达朗伯方程）：$$\nabla^{2}\phi-\mu\varepsilon  \frac{\partial^{2}\phi}{\partial t^{2}}=- \frac{\rho}{\varepsilon}$$ $$\nabla^{2}\boldsymbol{A}-\mu\varepsilon  \frac{\partial^{2}\boldsymbol{A}}{\partial t^{2}}=-\mu \boldsymbol{J}$$
> 洛伦兹规范在静态场的条件下退化为库仑规范。

对于时谐场，有非齐次亥姆霍兹方程$$\begin{cases}\nabla^{2}\phi+k^{2}\phi=- \frac{\rho}{\varepsilon}\\\nabla^{2}\boldsymbol{A}+k^{2}\boldsymbol{A}=-\mu \boldsymbol{J}\end{cases}$$洛伦兹规范为$$\boxed{\nabla \boldsymbol{\cdot A}=-\mathrm{j}\omega \mu \varepsilon \phi}$$

# 10.2    位方程的解
相位滞后因子：$$\mathrm{e}^{-\mathrm{j}k|\boldsymbol{r}-\boldsymbol{r}'|}$$
矢量磁位 $\boldsymbol{A}(\boldsymbol{r})$、标量电位 $\phi(\boldsymbol{r})$ 也称为滞后磁（电）位。

# 10.3    电基本振子的辐射场
电基本振子（电偶极子）：载有高频振荡电流 $i=I\mathrm{e}^{\mathrm{j}\omega t}$ 的短导线，其长度远小于波长，可认为导线上各点电流的幅度 $I$ 相同，相位也相同。

电偶极子的辐射：磁场仅有 $H_{\varphi}$ 分量，为纬线的切线方向。
场量仅有 $E_{r}$、$E_{\theta}$ 和 $H_{\varphi}$ 分量。场量与距离 $r$ 的变化关系复杂，但均随 $kr$ 的变化而变化。

## 1. 近区场
满足 $kr\ll 1$ 即 $r\ll \lambda$ 的区域称为近区，此时 $\mathrm{e}^{-\mathrm{j}kr}\approx 1$ 且 $\frac{1}{kr}\ll\frac{1}{(kr)^{2}}\ll\frac{1}{(kr)^{3}}$。

在近区场中， 电场表达式与静电偶极子的电场表达式相同； 磁场表达式与恒定电流元产生的磁场表达式相同。 因此称其为**似稳场**或**准静态场**（准稳恒场）。

电场 $E_{\theta}$ 和磁场 $H_{\varphi}$ 相位相差 $90\degree$，电磁场的平均坡印廷矢量为 $\boldsymbol{0}$，故不存在传播的电磁波，因此电偶极子近区场也称**振荡场**或**感应场**。

## 2. 远区场
满足 $kr\gg 1$ 即 $r\gg \lambda$ 的区域称为远区，此时 $\frac{1}{kr}\gg\frac{1}{(kr)^{2}}\gg\frac{1}{(kr)^{3}}$，故只保留 $\frac{1}{kr}$ 项。

等相位面为 $r=$ 常数的球面，故为球面波，但为**非均匀球面波**。

电场、磁场和传播方向相互垂直，远区场是横电磁波（TEM 波）。

电场和磁场无相位差，远区场沿 $+r$ 方向传播平均坡印廷矢量大于 $\boldsymbol{0}$，故电磁能量呈辐射状传播，因此电偶极子远区场也称**辐射场**。

电场、磁场的振幅与 $r$ 成反比，即为**衰减的行波**。

电场振幅与磁场振幅之比等于媒质的本征阻抗，即 $\eta_{0}=\frac{E_{\theta}}{H_{\varphi}}=\sqrt{ \frac{\mu_{0}}{\varepsilon_{0}} }$。

# 10.5    磁基本振子的辐射场
磁基本振子（磁偶极子）：载有高频振荡电流 $i=I\mathrm{e}^{\mathrm{j}\omega t}$ 的半径为无限小的平面电流圆环，其半径远小于波长，可认为其上各点等幅同相。

## 10.5.1    对偶性原理
磁偶极子的磁矩$$\boldsymbol{p}_{\mathrm{m}}=\boldsymbol{a}_{z}q_{\mathrm{m}}\mathrm{d}l$$
假想的磁荷$$q_{\mathrm{m}}=\frac{\mu_{0}S}{\mathrm{d}l}i$$
磁极之间假想的磁流$$i_{\mathrm{m}}=I_{\mathrm{m}}\mathrm{e}^{\mathrm{j}\omega t}$$磁流与电流之间的关系：$$I_{\mathrm{m}}= \frac{\mathrm{j}\omega \mu_{0}S}{\mathrm{d}l}I$$
对偶关系：

| $\boldsymbol{H}_{\mathrm{e}}$  | $\boldsymbol{E}_{\mathrm{e}}$ | $\boldsymbol{J}_{\mathrm{e}}$ | $\rho_{\mathrm{e}}$ | $\varepsilon$ |     $\mu$     | $k$ |      $\eta$      |       $q$        |       $I$        |
| :----------------------------: | :---------------------------: | :---------------------------: | :-----------------: | :-----------: | :-----------: | :-: | :--------------: | :--------------: | :--------------: |
| $-\boldsymbol{E}_{\mathrm{m}}$ | $\boldsymbol{H}_{\mathrm{m}}$ | $\boldsymbol{J}_{\mathrm{m}}$ | $\rho_{\mathrm{m}}$ |     $\mu$     | $\varepsilon$ | $k$ | $\frac{1}{\eta}$ | $q_{\mathrm{m}}$ | $I_{\mathrm{m}}$ |

## 10.5.2    磁基本振子的辐射
磁偶极子的远区场$$\boldsymbol{E}_{\mathrm{m}}=\boldsymbol{a}_{\varphi}  \frac{\omega \mu_{0}SI}{2\lambda r}\sin\theta \mathrm{e}^{-\mathrm{j}kr}$$ $$\boldsymbol{H}_{\mathrm{m}}=-\boldsymbol{a}_{\theta}  \frac{\omega \mu_{0}SI}{2\lambda r} \frac{1}{\eta_{0}}\sin\theta \mathrm{e}^{-\mathrm{j}kr}$$
等相位面为 $r=$ 常数的球面，故为球面波，但为**非均匀球面波**。

电场、磁场和传播方向相互垂直，远区场是**横电磁波（TEM 波）**。

辐射也具有方向性，磁偶极子的辐射场相对于电偶极子旋转 $90\degree$。

电场、磁场的振幅与 $r$ 成反比，即为**衰减的行波**。

电场振幅与磁场振幅之比等于媒质的本征阻抗，即 $\eta_{0}=\frac{E_{\theta}}{H_{\varphi}}=\sqrt{ \frac{\mu_{0}}{\varepsilon_{0}} }$。

磁偶极子通常作为接收天线。

# 10.6    天线的电参数
天线：能够有效地向空间某特定方向辐射电磁波或能够有效地接收空间某特定方向来的电磁波的装置。

主要参数：
- 特定方向辐射：方向性函数、方向图、方向性系数。
- 转化能力：效率。
- 方向性系数 + 效率：增益系数。
- 阻抗匹配：输入阻抗。
- 极化匹配：极化方式。
- 频带宽度：带宽。

## 10.6.1    方向性系数、方向图与波瓣宽度
方向性系数：在离开天线一定距离处（远区），描述天线空间各处电磁场强度分布的数学表达式。一般使用归一化方向性函数的形式。

电场强度的归一化方向性函数为：$$F(\theta,\varphi)=\frac{|E(\theta,\varphi)|}{|E_{\mathrm{max}}|}=|\sin\theta|$$式中 $|E(\theta,\varphi)|$ 为指定距离上某方向 $(\theta,\varphi)$ 的电场强度，$|E_{\mathrm{max}}|$ 为同一距离上最大的电场强度。

把方向性函数绘制成图，称为**方向图**。
![图](/assets/images/electromagnetic-fields-and-waves/IMG_20250531_222231.jpg)
![图](/assets/images/electromagnetic-fields-and-waves/IMG_20250531_222336.jpg)
![图](/assets/images/electromagnetic-fields-and-waves/IMG_20250531_222629.png)
主波瓣方向：最大辐射功率的方向。
半功率点方向：达到最大辐射功率的一半的方向。半功率点也是相应场强下降为最大值的 $\frac{\sqrt{ 2 }}{2}$ 的位置。
主瓣宽度：主波瓣方向两侧半功率点方向之间的夹角。记作 $2\theta_{0.5}$。

> 注意：在球坐标系中，$\theta$ 指的是与 $z$ 轴的夹角，而不是与 $x$ 轴的夹角。

## 10.6.2    方向性系数与增益系数
**辐射功率**：$$P_{\mathrm{r}}=\oint_{S}\boldsymbol{S}_{\mathrm{av}}\cdot \mathrm{d}\boldsymbol{s}=\oint_{S} \frac{1}{2} \frac{E^{2}(\theta,\varphi)}{\eta_{0}}r^{2}\sin\theta \mathrm{d}\theta \mathrm{d}\varphi$$

**方向性系数**：在相同的辐射功率条件下，某天线在最大辐射方向上某距离处产生的功率密度，与一理想的无方向性天线在同一距离处产生的功率密度之比。表示为 $D=\left.\frac{S_{\mathrm{max}}}{S_{0}}\right|_{P_{\mathrm{r}}相同}$ 或$$D=\left.\frac{|E_{\mathrm{max}}|^{2}}{|E_{0}|^{2}}\right|_{P_{\mathrm{r}}相同}$$
理想的**无方向性天线的方向性系数**$$D=\frac{4\pi}{\int_{0}^{2\pi}\int_{0}^{\pi}F^{2}(\theta,\varphi)\sin\theta \mathrm{d}\theta \mathrm{d}\varphi}$$
> 方向性系数 $D$ 可以表示为上式的计算值，也可以表示为分贝形式：$10\lg D$。

对于有方向性的天线，$$\boxed{|E_{\mathrm{max}}|^{2}=\frac{60DP_{\mathrm{r 0}}}{r^{2}}}$$
方向性系数的物理意义：天线在最大辐射方向上比无方向性天线将辐射功率增加的倍数。

**增益**（增益系数）：在相同的输入功率下，某天线在其最大辐射方向上某距离处产生的功率密度，与一理想的无方向性天线在同一距离处产生的功率密度之比，即 $G=\left. \frac{S_{\mathrm{max}}}{S_{0}}\right|_{P_{\mathrm{in}}相同}$ 或$$G=\left. \frac{|E_{\mathrm{max}}|^{2}}{|E_{0}|^{2}}\right|_{P_{\mathrm{in}}相同}$$
天线的辐射**效率**：天线的辐射功率与输入到天线的功率之比$$\eta_{\mathrm{A}}=\frac{P_{\mathrm{r}}}{P_{\mathrm{in}}}=\frac{P_{\mathrm{r}}}{P_{\mathrm{r}}+P_{\mathrm{l}}}$$其中 $P_{\mathrm{r}}$ 为辐射功率，$P_{\mathrm{in}}$ 为输入功率，$P_{\mathrm{l}}$ 为损耗功率。由此可得$$G=\eta_{\mathrm{A}}D$$

## 10.6.3    输入阻抗
天线的**输入阻抗**是指在天线输入端的高频电压 $U_{\mathrm{in}}$ 与输入端的电流 $I_{\mathrm{in}}$ 的比值，即$$Z_{\mathrm{in}}=\frac{U_{\mathrm{in}}}{I_{\mathrm{in}}}=R_{\mathrm{in}}+\mathrm{j}X_{\mathrm{in}}$$

---
参考教材：陈立甲, 李红梅, 宗华, 李伟. 电磁场与电磁波（第 2 版）[M]. 哈尔滨: 哈尔滨工业大学出版社, 2020.

授课教师：宗华。
