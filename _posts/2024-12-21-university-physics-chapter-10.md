---
layout: post
title: 第 10 章    热力学基础
category: 学习资料
tags: [考前复习, 大学物理]
---
## 10.1    热力学第一定律    内能    功    热量
### 10.1.1    热力学第一定律
系统的**内能**（internal energy）：系统与热现象相关的那部分能量。
**热力学第一定律**（the first law of thermodynamics）：$$Q=(E_2-E_1)+W\text{。}$$也可以表述为**第一类永动机是不可能实现的**。
### 10.1.3    功
在一个有限的准静态过程中，系统的体积由 $V_1$ 变为 $V_2$，系统对外界做的功为$$W=\int_{V_1}^{V_2}p\mathrm{d}V\text{。}$$
### 10.1.4    热量和热容量
**热量**（heat）：系统间由于热相互作用而传递的能量，一般用 $Q$ 表示。

**摩尔定压热容**（定压摩尔热容，molar heat capacity at constant pressure）：系统在压强保持不变的过程中 $1\ \mathrm{mol}$ 气体的热容，用 $C_{p,\mathrm{m}}$ 表示；**摩尔定容热容**（定体摩尔热容，molar heat capacity at constant volume）是系统在体积保持不变的过程中 $1\ \mathrm{mol}$ 气体的热容，用 $C_{V,\mathrm{m}}$ 表示。如果 $1\ \mathrm{mol}$ 气体温度升高 $\Delta T$，吸收热量为 $\Delta Q$，则有$$C_{p,\mathrm{m}}=\left (\frac{\mathrm{đ}Q}{\mathrm{d}T}\right )_{p,\mathrm{mol}}\text{，}$$ $$C_{V,\mathrm{m}}=\left (\frac{\mathrm{đ}Q}{\mathrm{d}T}\right )_{V,\mathrm{mol}}\text{。}$$
**迈耶公式**：$$C_{p,\mathrm{m}}=C_{V,\mathrm{m}}+R\text{。}$$
**比热容比**：$$\gamma=\frac{C_{p,\mathrm{m}}}{C_{V,\mathrm{m}}}\text{。}$$
由经典能量均分原理可导出$$C_{V,\mathrm{m}}=\frac{i}{2}R\text{。}$$
## 10.2    热力学第一定律的应用
### 10.2.1    等体过程
**等体过程**（isochoric process）：气体在状态变化过程中体积保持不变。在等体过程中，系统吸收的热量完全用来增加自身的内能。

吸收热量：$$Q_V=\frac{M}{M_{\mathrm{mol}}}C_{V,\mathrm{m}}(T_2-T_1)\text{，}$$内能增量：$$\Delta E=\frac{M}{M_{\mathrm{mol}}}\frac{i}{2}R(T_2-T_1)\text{，}$$（该式可以用于理想气体**任意过程**中内能的计算）

系统做功 $W=0$。
### 10.2.2    等压过程
**等压过程**（isobaric process）系统的吸热：$$Q_P=\frac{M}{M_{\mathrm{mol}}}C_{p,\mathrm{m}}(T_2-T_1)\text{，}$$内能的增量：$\Delta E=\frac{M}{M_{\mathrm{mol}}}C_{V,\mathrm{m}}(T_2-T_1)$（与等体过程相同）。

系统做功：$W=p(V_2-V_1)=\frac{M}{M_{\mathrm{mol}}}R(T_2-T_1)$。
### 10.2.3    等温过程
**等温过程**（isothermal process）系统做功和吸热：$$Q=W=\frac{M}{M_{\mathrm{mol}}}RT\ln \frac{V_2}{V_1}=\frac{M}{M_{\mathrm{mol}}}RT\ln \frac{p_1}{p_2}\text{。}$$系统内能的增量：$\Delta E=0$。
## 10.3    理想气体的绝热过程
**绝热过程**（adiabatic process）内能增量：$$\Delta E=\frac{M}{M_{\mathrm{mol}}}C_{V,\mathrm{m}}(T_2-T_1)\text{，}$$绝热过程的功：$$\begin{align}W&=-\frac{M}{M_{\mathrm{mol}}}C_{V,\mathrm{m}}(T_2-T_1)\\&=\frac{1}{\gamma -1}(p_1V_1-p_2V_2)\text{。}\end{align}$$理想气体准静态绝热过程方程（绝热方程）：$$pV^\gamma=C_1\text{，}\quad \text{（泊松公式）}$$ $$TV^{\gamma -1}=C_2\text{，}$$ $$p^{\gamma -1}T^{-\gamma}=C_3\text{。}$$
绝热线上任一点的斜率都比经过同一点的等温线的斜率稍大。
## 10.4    循环过程和卡诺循环
### 10.4.1    循环过程
**热力学循环**（thermodynamic cycle）：一个系统由某一状态出发，经过一系列过程又回到原来的状态。

特点：$\Delta E=0$。

**热机效率**（efficiency of heat engine）：$$\eta = \frac{W}{Q_{\text{吸}}}=1-\frac{\left | Q_{\text{放}}\right |}{Q_{\text{吸}}}\text{。}$$
制冷系数（coefficient of refrigerator）：$\varepsilon=\frac{Q_{\text{吸}}}{\left |W\right |}=\frac{Q_{\text{吸}}}{\left |Q_{\text{放}}\right |-Q_{\text{吸}}}$。
### 10.4.2    卡诺循环
**卡诺循环**（Carnot cycle）效率：$$\eta = 1-\frac{T_2}{T_1}$$仅由两热源的温度决定。

卡诺制冷系数：$\varepsilon=\frac{Q_{\text{吸}}}{\left |Q_{\text{放}}\right |-Q_{\text{吸}}}=\frac{T_{\text{低}}}{T_{\text{高}}-T_{\text{低}}}$。
## 10.5    热力学第二定律和不可逆过程    卡诺定理
### 10.5.2    热力学第二定律的两种表述
**热力学第二定律**（the second law of thermodynamics）的开尔文表述：“不可能制成一种循环动作的热机，只从单一热源吸取热量使之完全变为有用功而不产生任何其他影响。”或“第二类永动机是不可能制成的。”

热力学第二定律的克劳修斯表述：“不可能把热量从低温物体传到高温物体而不引起其他任何变化。”或“热量不可能自动地从低温物体传向高温物体。”
## 10.6    热力学第二定律的统计意义和熵的概念
### 10.6.2    熵和玻尔兹曼熵公式及熵增加原理
玻尔兹曼熵公式：$$S=k\ln \Omega \text{，}$$其中 $S$ 为熵（entropy），$\Omega$ 为热力学概率（thermodynamic probability），$k$ 为玻尔兹曼常量。熵具有可叠加性。

熵增加原理（principle of entropy increase）：$\mathrm{d}S\geq 0$，其中等号仅适用于可逆过程。
### 10.6.3    熵的热力学表示及熵差计算
$$S_2-S_1\geq \int_1^2 \frac{\mathrm{đ}Q}{T}\text{，}$$其中“$=$”适用于可逆过程，“$\gt$”号适用于不可逆过程。
### 补充：熵的计算
1. 理想气体可逆过程的熵变
(1) 绝热过程：$S_B-S_A= \int_A^B \frac{\mathrm{đ}Q}{T}=0\text{。}$
(2) 等体过程：$S_B-S_A=\nu C_{V,\mathrm{m}}\ln \frac{T_B}{T_A}$。
(3) 等压过程：$S_B-S_A=\nu C_{p,\mathrm{m}}\ln \frac{T_B}{T_A}$。
(4) 等温过程：$S_B-S_A=\nu R\ln \frac{V_B}{V_A}$。
（其中 $\nu$ 表示气体的物质的量）

2. 不可逆过程的熵变
在不可逆过程的始末两种状态之间设计一个可逆过程，然后再利用已知的可逆过程的熵变公式就可以计算出不可逆过程的熵变。