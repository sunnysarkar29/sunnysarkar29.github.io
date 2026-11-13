# Homework 07 — Source question statements

## Original question for section 1

**Problem 1, part 1.** The closed-loop control system must have **15 Hz bandwidth** with very little overshoot. Output disturbances below **5 Hz** must be attenuated to no more than **1/10**; sensor noise above **30 Hz** must also be attenuated to no more than **1/10**.

List the required **crossover frequency**, desired **phase margin and gain margin** (choose class values), and the **bounds on $L(j\omega)$** implied by the constraints.

*Original instruction for all of Problem 1:* Translate requirements into loop-transfer-function requirements; **do not actually design a controller**.

---

## Original question for section 2

**Problem 1, part 2.** Lateral cockpit vibrations occur at **8 Hz**. Design **requirements** for a rudder modal-suppression controller that reduces vibrations to **1/10** of original amplitude without interacting with aircraft rigid-body motion; take this to mean $T$ should be “small” **below 8 Hz**. Treat vibrations as **output disturbances**.

List the desired **phase margin**, **gain margin**, and implied **bounds on $L(j\omega)$**.

---

## Original question for section 3

**Problem 1, part 3.** Desired aircraft pitch response: **less than 20% overshoot**, rise time approximately **2 seconds**, and small steady-state error. The closed loop should **not degrade gust-disturbance rejection at any frequency**.

List the required crossover frequency, desired phase and gain margins (choose class values), and the bounds on $L(j\omega)$ implied by the constraints.

---

## Original question for section 4

Consider the nominal loop-transfer-function **Nichols chart** below, with assumed crossover frequency **1 rad/s**.

1. Draw a modified loop shape giving **greater disturbance rejection** at frequencies below crossover. More than one answer is possible.
2. Propose a **control structure** $C$ satisfying $L_{new}(s)=C(s)L_{nominal}(s)$ to produce your proposed loop shape.

![Original Nichols chart of the nominal loop](figures/question-hw07-nichols.webp)

*Original figure from the supplied assignment/exam. Included here so the question can be answered without the PDF.*


---

## Original question for section 5

Consider the noisy step response below, produced by a **step of magnitude 4** applied at **1 second**.

1. Using only the step response, estimate the underlying **dynamical system**. The assignment suggests lecture material on step responses and the final-value theorem.
2. Sketch a Bode or Nichols **loop transfer function** to obtain a **2-second rise time**, **less than 5% overshoot**, and **zero unit-step steady-state error**. Mark crossover, phase and gain margins, and slope.
3. What controller is required for that loop shape?

![Original measured step response used for system identification](figures/question-hw07-step.webp)

*Original figure from the supplied assignment/exam. Included here so the question can be answered without the PDF.*


---

## Original question for section 6

These questions explore the **Nyquist stability criterion**:

1. A Nyquist plot makes **two counterclockwise encirclements** of $(-1,0)$. How many **closed-loop right-half-plane (RHP) poles** are there?
2. Using the **first plot below**, if the closed loop is **stable**, how many RHP poles are in the **open-loop** $L(s)$?
3. Using the **second plot below**, if the open loop has **one RHP pole**, how many RHP poles does the closed-loop system have?

![Original Nyquist plot for Problem 4 part 2](figures/question-hw07-nyq1.webp)

*Original figure from the supplied assignment/exam. Included here so the question can be answered without the PDF.*


![Original Nyquist plot for Problem 4 part 3](figures/question-hw07-nyq2.webp)

*Original figure from the supplied assignment/exam. Included here so the question can be answered without the PDF.*
