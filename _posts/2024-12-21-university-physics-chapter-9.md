---
layout: post
title: 第 9 章    气体动理论
category: 学习资料
tags: [考前复习, 大学物理]
---
## 9.1    状态参量    平衡态    准静态过程
在热力学中把有大量分子组成的宏观物体（气体、液体、固体）称为热力学系统，简称系统。

**外界**：系统以外与系统有着相互作用的环境。

**孤立系统**：与外界不发生任何能量和物质交换的热力学系统。

**封闭系统**：与外界只有能量交换而没有物质交换的系统。
## 9.2    理想气体的物态方程
**理想气体物态方程**（理想气体状态方程，equation of ideal gases）：$$pV=\frac{M}{M_{\mathrm{mol}}}RT\text{。}$$**摩尔气体常量**（molar gas constant）：$R=8.314\ 41\  \mathrm{J}\cdot \mathrm{mol}^{-1} \cdot \mathrm{K}^{-1}$。
## 9.3    麦克斯韦速率分布
### 9.3.1    麦克斯韦速率分布律
**速率分布函数**（distribution function of speed）：$$f(v)\mathrm{d}v=\frac{\mathrm{d}N}{N}\text{，}$$**麦克斯韦速率分布函数**：$$f(v)=4\pi \left (\frac{m}{2\pi kT}\right )^{\frac{3}{2}}\mathrm{e}^{-\frac{mv^2}{2kT}}v^2\text{，}$$其中 $k$ 称为**玻尔兹曼常量**（Boltzmann constant），$k=\frac{R}{N_{\mathrm{A}}}=1.38\times 10^{-23}\ \mathrm{J}\cdot \mathrm{K}^{-1}$。麦克斯韦速率分布函数满足**归一化条件**，即$$\int_0^{\infty}f(v)\mathrm{d}v=1\text{。}$$
### 9.3.2    三个统计速率
**分子的平均速率**（mean speed）：$$\overline{v}=\sqrt{\frac{8kT}{\pi m}}=\sqrt{\frac{8RT}{\pi M_{\mathrm{mol}}}}\approx 1.60\sqrt{\frac{RT}{M_{\mathrm{mol}}}}\text{，}$$**方均根速率**（root-mean-square speed）：$$\sqrt{\overline{v^2}}=\sqrt{\frac{3kT}{m}}=\sqrt{\frac{3RT}{M_{\mathrm{mol}}}}\approx 1.73\sqrt{\frac{RT}{M_{\mathrm{mol}}}}\text{，}$$**最概然速率**（most probable speed）：$$v_{\mathrm{p}}=\sqrt{\frac{2kT}{m}}=\sqrt{\frac{2RT}{M_{\mathrm{mol}}}}\approx 1.41\sqrt{\frac{RT}{M_{\mathrm{mol}}}}\text{。}$$
## 9.4    玻尔兹曼分布
### 9.4.1    玻尔兹曼分布律
当系统在外力场中处于平衡状态时，其中坐标介于区间 $x$ ~ $x+\mathrm{d}x$；$x$ ~ $y+\mathrm{d}y$；$z$ ~ $z+\mathrm{d}z$ 内，同时速度介于 $v_x$ ~ $v_x+\mathrm{d}v_x$；$v_y$ ~ $v_y+\mathrm{d}v_y$；$v_z$ ~ $v_z+\mathrm{d}v_z$ 区间内的分子数为$$\mathrm{d}N=n_0\left (\frac{m}{2\mathrm{\pi}kT}\right )^{\frac{3}{2}}\mathrm{e}^{-\frac{\varepsilon_{\mathrm{k}}+\varepsilon_{\mathrm{p}}}{kT}}\mathrm{d}v_x\mathrm{d}v_y\mathrm{d}v_z\mathrm{d}x\mathrm{d}y\mathrm{d}z\text{，}$$式中，$n_0$ 表示势能为零处单位体积内具有各种速率的分子数。此结论称**玻尔兹曼分子按能量分布定律**，简称**玻尔兹曼分布律**（Boltzmann distribution law）。

**分子数按势能的分布律**：分布在坐标区间 $x$ ~ $x+\mathrm{d}x$；$x$ ~ $y+\mathrm{d}y$；$z$ ~ $z+\mathrm{d}z$ 内单位体积的分子数为$$n=n_{0}\mathrm{e}^{-\frac{\varepsilon_{\mathrm{p}}}{kT}}\text{。}$$
### 9.4.2    重力场中微粒按高度的分布
设 $n_0$ 为 $z=0$ 处的分子数密度，$n$ 为 $z$ 高度的分子数密度，则$$n=n_0\mathrm{e}^{-\frac{mgz}{kT}}\text{。}$$
**等温气压公式**：$p=nkT=p_0 \mathrm{e}^{-\frac{mgz}{kT}}=p_{0}\mathrm{e}^{-\frac{M_{\mathrm{mol}}gz}{RT}}$。
高度计的原理：$z=\frac{RT}{M_{\mathrm{mol}}g}\ln \frac{p_0}{p}$。
## 9.5    理想气体的压强
理想气体压强公式：$$p=\frac{2}{3}n\overline{\varepsilon}_{\mathrm{k}}\text{。}$$
**气体分子的平均平动动能**：$\overline{\varepsilon}_{\mathrm{k}}=\frac{1}{2}m\overline{v^2}$。
## 9.6    温度的微观本质    理想气体物态方程的推证
理想气体的温度公式：$$\overline{\varepsilon}_{\mathrm{kt}}=\frac{3}{2}kT\text{，}$$ $$p=nkT\text{。}$$
## 9.7    能量均分定理    理想气体的内能
### 9.7.1    自由度
自由度：**确定一个物体在空间的位置所需要的独立坐标数目**称为该**物体的自由度数**（number of degree of freedom）。

|  分子种类   | 平动自由度 $t$ | 转动自由度 $r$ | 总自由度 $i$ |
| :-----: | :-------: | :-------: | :------: |
|  单原子分子  |     3     |     0     |    3     |
| 刚性双原子分子 |     3     |     2     |    5     |
| 刚性多原子分子 |     3     |     3     |    6     |
### 9.7.2    能量均分定理
**能量按自由度均分定理**（简称**能量均分定理**，energy equipartition theorem）：在温度为 $T$ 的平衡态下，物质分子的每一个自由度都具有相同的平均动能，其大小都等于 $\frac{1}{2}kT$。$$\overline{\varepsilon}_{\mathrm{kt}}=\frac{3}{2}kT\text{。}$$分子的**平均动能**为$$\overline{\varepsilon}_{\mathrm{k}}=\frac{i}{2}kT。$$
### 9.7.3    理想气体的内能
理想气体的内能为$$E=\frac{M}{M_{\mathrm{mol}}}\frac{i}{2}RT\text{。}$$理想气体的内能是温度的单值函数。
## 9.9    气体分子的平均自由程和平均碰撞频率
**平均碰撞频率**（collision frequency）：$$\overline{z}=\sqrt{2}\pi d^2\overline{v}n\text{，}$$分子**平均自由程**（mean free path）：$$\overline{\lambda}=\frac{\overline{v}}{\overline{z}}=\frac{1}{\sqrt{2}\pi d^2 n}\text{，}$$由 $p=nkT$，可得$$\overline{\lambda}=\frac{kT}{\sqrt{2}\pi d^2 p}\text{。}$$