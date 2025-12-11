const Loan = require('../Models/loan');

// Obtener todos los préstamos
exports.getLoans = async (req, res) => {
  try {
    const loans = await Loan.find();
    res.json(loans);
  } catch (error) {
    console.error('Error al obtener préstamos:', error);
    res.status(500).json({ error: 'Error al obtener préstamos' });
  }
};

// Agregar un nuevo préstamo
exports.addLoan = async (req, res) => {
  try {
    // Evitar que llegue un _id desde el frontend
    const data = { ...req.body };
    delete data._id;

    const nuevoPrestamo = new Loan(data);
    await nuevoPrestamo.save();

    res.status(201).json(nuevoPrestamo);
  } catch (error) {
    console.error('Error al agregar préstamo:', error);
    res.status(500).json({ error: 'Error al agregar préstamo' });
  }
};


// Agregar un pago a un préstamo
exports.addPago = async (req, res) => {
  try {
    const { id } = req.params;
    const { total, interes, abono, fecha } = req.body;

    const loan = await Loan.findById(id);
    if (!loan) return res.status(404).json({ error: 'Préstamo no encontrado' });

    const nuevoPago = { total, interes, abono, fecha };
    loan.pagos.push(nuevoPago);

    await loan.save();

    res.status(201).json(nuevoPago);
  } catch (error) {
    console.error('Error al agregar pago:', error);
    res.status(500).json({ error: 'Error al agregar pago' });
  }
};

// Marcar como terminado
exports.markAsTerminado = async (req, res) => {
  try {
    const { id } = req.params;
    const { terminado } = req.body;

    const loan = await Loan.findByIdAndUpdate(
      id,
      { terminado },
      { new: true }
    );

    if (!loan) return res.status(404).json({ error: 'Préstamo no encontrado' });

    res.json({ message: 'Estado actualizado', terminado: loan.terminado });
  } catch (error) {
    console.error('Error al marcar como terminado:', error);
    res.status(500).json({ error: 'Error al actualizar préstamo' });
  }
};
